import Router from 'koa-router';
import render from './render';

const router = new Router();

router.get('/', render);
router.get('/masses', render);
router.get('/masses/year-a', render);
router.get('/masses/year-b', render);
router.get('/masses/year-c', render);

export default router;
