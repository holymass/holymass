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
import redisClient from './redis';

const logger = log4js.getLogger('render');
const indexHtmlPath = path.join(__dirname, '../assets/index.html');
const html = fs.readFileSync(indexHtmlPath, 'utf8');

export default async (ctx, next) => {
  const url = ctx.req.url;
  let body = await redisClient.getAsync(url);
  if (body) {
    logger.debug(`Hit redis cache: ${url}`);
    ctx.body = body;
    return;
  }
  const context = {};
  const reactApp = (
    <Provider store={createStore()}>
      <StaticRouter context={context} location={ctx.req.url}>
        <App/>
      </StaticRouter>
    </Provider>
  );
  const loadableState = await getLoadableState(reactApp);
  body = ReactDOMServer.renderToString(reactApp);
  body = html
      .replace('<div id=root></div>', `<div id=root>${body}</div>`)
      .replace('<script id=loadable></script>',
          `${loadableState.getScriptTag()}`);
  redisClient.set(url, body);
  ctx.body = body;
};
