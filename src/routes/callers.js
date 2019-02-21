import Router from 'koa-router';
import pause from '../lib/pause';

const router = new Router();

// Organization routes

router.get('/pending', async (ctx) => {
    await pause(1000);

    ctx.body = [];
});

router.get('/verified', async (ctx) => {
    await pause(1000);

    ctx.body = [];
});

router.get('/:id', async (ctx) => {
    await pause(1000);

    ctx.body = {};
});

router.patch('/:id', async (ctx) => {
    await pause(1000);

    ctx.body = {};
});

router.delete('/:id', async (ctx) => {
    await pause(1000);

    ctx.body = {};
});

export default router;
