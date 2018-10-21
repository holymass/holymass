import path from 'path';
import Koa from 'koa';
import koaI18next from 'koa-i18next';
import koaMount from 'koa-mount';
import koaStatic from 'koa-static';
import log4js from 'log4js';
import i18n from './i18n';
import router from './router';

const app = new Koa();
const port = 3000;

const assets = new Koa();
assets.use(koaStatic(path.join(__dirname, '../assets')));
app.use(koaMount('/assets', assets));

const locales = new Koa();
locales.use(koaStatic(path.join(__dirname, '../locales')));
app.use(koaMount('/locales', locales));

app.use(koaI18next(i18n, {
  lookupCookie: 'i18next',
  lookupSession: 'lng',
  lookupQuerystring: 'lng',
  next: true,
}));

const logger = log4js.getLogger('iannar');
logger.level = 'info';

app.use(async (ctx, next) => {
  logger.info(`${ctx.req.method} ${ctx.req.url}`);
  await next();
  logger.info(ctx.body);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  logger.info(`Running on http://localhost:${port}/`);
});
