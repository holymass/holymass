import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import koaI18next from 'koa-i18next';
import Router from 'koa-router';
import koaStatic from 'koa-static';
import log4js from 'log4js';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {I18nextProvider} from 'react-i18next';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import Loadable from 'react-loadable';
import {getBundles} from 'react-loadable/webpack';
import Helmet from 'react-helmet';
import stats from '../assets/react-loadable.json';
import createStore from '../src/store';
import App from '../src/app';
import i18n from './i18n';

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;
const logger = log4js.getLogger();
logger.level = 'info';

app.use(koaI18next(i18n, {
  lookupCookie: 'i18next',
  lookupSession: 'lng',
  lookupQuerystring: 'lng',
  next: true,
}));

const render = async (ctx, next) => {
  logger.debug(ctx.req.url);
  const filePath = path.resolve(__dirname, '../index.html');
  await fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) {
      logger.error(err);
      return 404;
    }
    const modules = [];
    const body = ReactDOMServer.renderToString(
        <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
          <Provider store={createStore()}>
            <I18nextProvider i18n={ctx.i18next}>
              <MemoryRouter>
                <App/>
              </MemoryRouter>
            </I18nextProvider>
          </Provider>
        </Loadable.Capture>
    );
    const helmet = Helmet.renderStatic();
    const head = `
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
    `;
    const bundles = getBundles(stats, modules);
    const styles = bundles
        .filter((x) => x && x.file.endsWith('.css'))
        .map((x) => `<link href="/assets/${x.file}" rel="stylesheet" />`);
    const scripts = bundles
        .filter((x) => x && x.file.endsWith('.js'))
        .map((x) => `<script src="/assets/${x.file}/"></script>`);
    ctx.body = html
        .replace('<html', `<html ${helmet.htmlAttributes.toString()}`)
        .replace('</head>', `${head}${styles}</head>`)
        .replace('<div id=root></div>', `<div id=root>${body}</div>`)
        .replace('</body>', `${scripts}</body>`);
  });
};

router.get('/', render);

app.use(router.routes());
app.use(koaStatic(__dirname, 'assets'));

Loadable.preloadAll().then(() => {
  app.listen(port, () => {
    logger.info(`Running on http://localhost:${port}/`);
  });
});
