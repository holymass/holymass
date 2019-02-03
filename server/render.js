import path from 'path';
import log4js from 'log4js';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import {ChunkExtractor, ChunkExtractorManager} from '@loadable/server';
import createStore from '../src/store';
import App from '../src/app';
import {redisClient, buildRedisKey} from './redis';

const logger = log4js.getLogger('render');
const statsFile = path.join(__dirname, '../assets/loadable-stats.json');
const extractor = new ChunkExtractor({
  statsFile,
});

const getLanguage = (ctx) => {
  return ctx.language || process.env.DEFAULT_LANGUAGE;
};

const getPreloadedState = (ctx) => {
  const settings = {
    amapkey: process.env.AMAP_KEY,
    mapCenter: process.env.MAP_CENTER.split(','),
    language: getLanguage(ctx),
  };
  return {settings};
};

export default async (ctx, next) => {
  const url = ctx.req.url;
  const language = getLanguage(ctx);
  let redisKey = buildRedisKey(language, url);
  let body = await redisClient.getAsync(redisKey);
  if (body) {
    logger.debug(`Hit redis cache: ${url}`);
    ctx.body = body;
    return;
  }
  let state = getPreloadedState(ctx);
  const store = createStore(state);
  const context = {};
  const reactApp = (
    <Provider store={store}>
      <StaticRouter context={context} location={ctx.req.url}>
        <ChunkExtractorManager extractor={extractor}>
          <App/>
        </ChunkExtractorManager>
      </StaticRouter>
    </Provider>
  );
  state = JSON.stringify(store.getState());
  state = `window.__PRELOADED_STATE__ = ${state};`;
  body = ReactDOMServer.renderToString(reactApp);
  body = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>iannar</title><meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"><meta name="google-analytics" content="UA-120959122-1">${extractor.getStyleTags()}</head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id=root>${body}</div><script src=https://unpkg.com/react@16/umd/react.production.min.js></script><script src=https://unpkg.com/react-dom@16/umd/react-dom.production.min.js></script><script>${state}</script>${extractor.getScriptTags()}</body></html>`;
  redisClient.set(redisKey, body, 'EX', 3600 * 12);
  ctx.body = body;
};
