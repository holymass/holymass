import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import {
  createGenerateClassName,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/styles';
import { SheetsRegistry } from 'jss';
import log4js from 'log4js';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import App from '../src/App';
import createStore from '../src/createStore';
import theme from '../src/theme';
import fetchData from './fetchData';
import redisClient from './redisClient';

const logger = log4js.getLogger('render');
const statsFile = path.join(__dirname, '../assets/loadable-stats.json');
const extractor = new ChunkExtractor({
  statsFile,
});

const getLanguage = () => {
  return process.env.DEFAULT_LANGUAGE.split('-')[0];
};

const getPreloadedState = async (ctx) => {
  logger.info(`Preparing preloaded state for ${ctx.url}`);
  const state = await Promise.all([
    fetchData('/data/masses/a.json'),
    fetchData('/data/masses/b.json'),
    fetchData('/data/masses/c.json'),
  ]).then(([yearA, yearB, yearC]) => {
    return {
      mass: {
        yearA: JSON.parse(yearA),
        yearB: JSON.parse(yearB),
        yearC: JSON.parse(yearC),
      },
    };
  });
  return state;
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
  const redisKey = `${ctx.language}:${url}`;
  if (process.env.NODE_ENV !== 'development') {
    const cache = await redisClient.getAsync(redisKey);
    if (cache) {
      logger.info(`Hit redis cache: ${redisKey}`);
      ctx.body = cache;
      next();
      return;
    }
  }
  let state = await getPreloadedState(ctx);
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
  initialI18nStore = JSON.stringify(initialI18nStore);
  const reactAppHtml = ReactDOMServer.renderToString(reactApp);
  ctx.body = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>HolyMass</title>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="google-analytics" content="UA-120959122-1">
    <meta http-equiv="x-dns-prefetch-control" content="on" />
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
    <div id="root">${reactAppHtml}</div>
    <script crossorigin src="https://unpkg.com/react@16.13.1/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js"></script>
    <script>
      window.PRELOADED_STATE = ${state};
      window.INITIAL_I18N_STORE = ${initialI18nStore};
    </script>
    ${extractor.getScriptTags()}
  </body>
</html>`;
  redisClient.set(redisKey, ctx.body, 'EX', 3600 * 24);
  next();
};
