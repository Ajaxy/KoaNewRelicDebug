import Router from 'koa-router';
import pause from '../lib/pause';

const router = new Router();

// Organization routes

router.get('/pending', async (ctx) => {
    await pause(1000);

    ctx.body = {};
});

export default router;
