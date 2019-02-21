import Koa from 'koa';
import logger from 'koa-logger';
import enforceHttps from 'koa-sslify';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import cacheControl from 'koa-cache-control';
import compress from 'koa-compress';
import routes from './routes';
import config from './config';
import { handleErrors } from './middleware/handleErrors';
import { onKoaError } from './lib/errors';

const COMPRESS_THRESHOLD = 5120; // 5 KB

const {
    env: { isDevelopment, isStaging, isProduction, isTesting },
    app: { port },
    auth: { secret },
} = config;

export default (initHook) => {
    const app = new Koa();

    if (isStaging || isProduction) {
        app.use(enforceHttps({ trustProtoHeader: true }));
    }

    if (initHook) {
        initHook(app);
    }

    app.keys = secret;

    if (isDevelopment || isStaging) {
        app.use(logger());
    }

    app
        .use(handleErrors)
        .use(cors())
        .use(cacheControl({ noCache: true }))
        .use(compress({ threshold: COMPRESS_THRESHOLD }))
        .use(bodyParser())
        .use(routes.routes())
        .use(routes.allowedMethods())
        .on('error', onKoaError);

    if (isTesting) {
        return app.callback();
    }

    app.listen({ port }, () => {
        // eslint-disable-next-line no-console
        console.log(`Koa listening on :${port}`);
    });

    return null;
};
