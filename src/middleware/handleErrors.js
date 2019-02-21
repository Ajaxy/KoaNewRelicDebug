import { SEQUELIZE_VALIDATION_ERRORS } from '../lib/errors';

export async function handleErrors(ctx, next) {
    try {
        await next();
    } catch (err) {
        ctx.body = {
            error: true,
            success: false,
            message: err.message
        };

        if (SEQUELIZE_VALIDATION_ERRORS.includes(err.name)) {
            err.status = 422;
            ctx.body.errors = err.errors;
        }

        ctx.status = Number(err.status) || 500;

        ctx.app.emit('error', err, ctx);
    }
}
