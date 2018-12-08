import fs from 'fs';
import path from 'path';
import log4js from 'log4js';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import {getLoadableState} from 'loadable-components/server';
import createStore from '../src/store';
import App from '../src/app';
import {redisClient, buildRedisKey} from './redis';

const logger = log4js.getLogger('render');
const indexHtmlPath = path.join(__dirname, '../assets/index.html');
const html = fs.readFileSync(indexHtmlPath, 'utf8');

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

const getScriptTag = (state) => {
  if (state.getScriptTag) {
    return state.getScriptTag();
  }
  return `<script>${state}</script>`;
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
  let preloadedState = getPreloadedState(ctx);
  const store = createStore(preloadedState);
  const context = {};
  const reactApp = (
    <Provider store={store}>
      <StaticRouter context={context} location={ctx.req.url}>
        <App/>
      </StaticRouter>
    </Provider>
  );
  preloadedState = JSON.stringify(store.getState());
  preloadedState = `window.__PRELOADED_STATE__ = ${preloadedState};`;
  const loadableState = await getLoadableState(reactApp);
  body = ReactDOMServer.renderToString(reactApp);
  body = html
      .replace('<div id=root></div>', `<div id=root>${body}</div>`)
      .replace('<script id=state></script>', getScriptTag(preloadedState))
      .replace('<script id=loadable></script>', getScriptTag(loadableState));
  redisClient.set(redisKey, body);
  ctx.body = body;
};
