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
import { redisClient, buildRedisKey } from './redis';

const logger = log4js.getLogger('render');
const statsFile = path.join(__dirname, '../assets/loadable-stats.json');
const extractor = new ChunkExtractor({
  statsFile,
});

const getLanguage = (ctx) => {
  const language = ctx.language || process.env.DEFAULT_LANGUAGE;
  return language.split('-')[0];
};

const getPreloadedState = (ctx) => {
  const mapCenter = process.env.MAP_CENTER.split(',').map((x) => +x);
  const settings = {
    language: getLanguage(ctx),
    map: {
      amapkey: process.env.AMAP_KEY,
      center: {
        longitude: mapCenter[0],
        latitude: mapCenter[1],
      },
    },
  };
  return { settings };
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
  const language = getLanguage(ctx);
  const redisKey = buildRedisKey(language, url);
  let body = null;
  if (process.env.NODE_ENV !== 'development') {
    body = await redisClient.getAsync(redisKey);
    if (body) {
      logger.info(`Hit redis cache: ${url}`);
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
  body = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>HolyMass</title><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"><meta name="google-analytics" content="UA-120959122-1"><style id="jss-server-side">${sheetsRegistry.toString()}</style>${extractor.getStyleTags()}</head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id=root>${body}</div><script src=https://unpkg.com/react@16/umd/react.production.min.js></script><script src=https://unpkg.com/react-dom@16/umd/react-dom.production.min.js></script><script>${state}${initialI18nStore}</script>${extractor.getScriptTags()}</body></html>`;
  redisClient.set(redisKey, body, 'EX', 3600 * 12);
  ctx.body = body;
  next();
};
