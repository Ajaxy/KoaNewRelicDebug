import Router from 'koa-router';
import calls from './calls';
import callers from './callers';

const router = new Router();

router.use('/calls',
    calls.routes(),
    calls.allowedMethods());

router.use('/callers',
    callers.routes(),
    callers.allowedMethods());

export default router;
