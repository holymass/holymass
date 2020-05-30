import Router from 'koa-router';
import render from './render';
import fetchData from './fetchData';

const router = new Router();

router.get('/', render);
router.get('/data/masses/:id', async (ctx, next) => {
  ctx.body = await fetchData(ctx.url);
  ctx.set('content-type', 'application/json');
  next();
});
router.get('/masses', render);
router.get('/masses/:id', render);

export default router;
