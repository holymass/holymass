import Router from 'koa-router';
import render from './render';

const router = new Router();

router.get('/', render);
router.get('/masses', render);
router.get('/churches', render);
router.get('/settings', render);

export default router;
