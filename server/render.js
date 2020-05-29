import path from 'path';
import log4js from 'log4js';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { StaticRouter } from 'react-router-dom';
import { SheetsRegistry } from 'jss';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import {
  StylesProvider,
  ThemeProvider,
  createGenerateClassName,
} from '@material-ui/styles';
import createStore from '../src/createStore';
import theme from '../src/theme';
import App from '../src/App';
import redis from './redis';

const logger = log4js.getLogger('render');
const statsFile = path.join(__dirname, '../assets/loadable-stats.json');
const extractor = new ChunkExtractor({
  statsFile,
});

const getLanguage = () => {
  return process.env.DEFAULT_LANGUAGE.split('-')[0];
};

const getPreloadedState = () => {
  return {};
};

const getInitialI18nStore = (ctx) => {
  const i18n = ctx.i18next;
  const initialI18nStore = {};
  const languages = i18n.services.languageUtils.toResolveHierarchy(
    getLanguage(ctx),
  );
  languages.forEach((l) => {
    initialI18nStore[l] = i18n.services.resourceStore.data[l];
  });
  i18n.languages = languages;
  return initialI18nStore;
};

export default async (ctx, next) => {
  const { url } = ctx.req;
  let body = null;
  const redisKey = `${ctx.language}:${url}`;
  if (process.env.NODE_ENV !== 'development') {
    body = await redis.client.getAsync(redisKey);
    if (body) {
      logger.info(`Hit redis cache: ${redisKey}`);
      ctx.body = body;
      return;
    }
  }
  let state = getPreloadedState(ctx);
  let initialI18nStore = getInitialI18nStore(ctx);
  const store = createStore(state);
  const context = {};
  const sheetsRegistry = new SheetsRegistry();
  const reactApp = (
    <Provider store={store}>
      <I18nextProvider i18n={ctx.i18next}>
        <StaticRouter context={context} location={ctx.req.url}>
          <ThemeProvider theme={theme}>
            <StylesProvider
              sheetsRegistry={sheetsRegistry}
              generateClassName={createGenerateClassName()}
              sheetsManager={new Map()}
            >
              <ChunkExtractorManager extractor={extractor}>
                <App />
              </ChunkExtractorManager>
            </StylesProvider>
          </ThemeProvider>
        </StaticRouter>
      </I18nextProvider>
    </Provider>
  );
  state = JSON.stringify(state);
  state = `window.PRELOADED_STATE = ${state};`;
  initialI18nStore = JSON.stringify(initialI18nStore);
  initialI18nStore = `window.INITIAL_I18N_STORE = ${initialI18nStore};`;
  body = ReactDOMServer.renderToString(reactApp);
  body = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>HolyMass</title>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="google-analytics" content="UA-120959122-1">
    <meta http-equiv="x-dns-prefetch-control" content="on" />
    <link rel="preconnect" href="https://unpkg.com" crossorigin>
    <link rel="dns-prefetch" href="https//assets.holymass.app">
    <link rel="preconnect" href="https://assets.holymass.app/masses/index.html" crossorigin>
    <link rel="dns-prefetch" href="https//assets.holymass.app">
    <style>
      body {
        margin: auto;
        font-family: "PingFang SC", "Microsoft YaHei", "Open Sans", sans-serif,
      }
      pre {
        font-family: Hack, "Fira Code", Menlo, "Liberation Mono", Courier, monospace;
      }
    </style>
    <style id="jss-server-side">
      ${sheetsRegistry.toString()}
    </style>
    ${extractor.getStyleTags()}
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">${body}</div>
    <script crossorigin src="https://unpkg.com/react@16.13.1/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js"></script>
    <script>${state}${initialI18nStore}</script>
    ${extractor.getScriptTags()}
  </body>
</html>`;
  redis.client.set(redisKey, body, 'EX', 3600 * 12);
  ctx.body = body;
  next();
};
