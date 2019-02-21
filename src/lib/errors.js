import newrelic from 'newrelic';
import config from '../config';

const {
    env: { isProduction, isStaging, isTesting },
    LOG_ALL_ERRORS
} = config;

export const SEQUELIZE_VALIDATION_ERRORS = [
    'SequelizeUniqueConstraintError',
    'SequelizeValidationError',
    'SequelizeForeignKeyConstraintError'
];

export const logError = (err, params) => {
    if (isProduction || isStaging) {
        newrelic.noticeError(err, params);
    }

    if (isTesting && SEQUELIZE_VALIDATION_ERRORS.includes(err.name)) {
        return;
    }

    // eslint-disable-next-line no-console
    console.error(err, params);
};

export class HttpError extends Error {
    constructor(status, message) {
        super(message);
        Error.captureStackTrace(this);
        this.name = 'HttpError';
        this.status = status;
    }
}

export function onKoaError(err, ctx) {
    const { status = 500 } = ctx;

    if (LOG_ALL_ERRORS || !String(status).match(/^4\d{2}$/) || SEQUELIZE_VALIDATION_ERRORS.includes(err.name)) {
        const { status, message, name, errors } = err;
        const { ip, params: pathParams } = ctx;
        const { query: queryParams, body: bodyParams } = ctx.request;
        const { id: userId, role: userRole } = ctx.state.user || {};
        const headers = {
            'headers: Authorization': ctx.get('Authorization'),
            'headers: X-Client-Name': ctx.get('X-Client-Name'),
            'headers: X-Client-Version': ctx.get('X-Client-Version')
        };

        logError(err, {
            status, message, name, errors,
            pathParams, queryParams, bodyParams,
            ip, userId, userRole,
            ...headers
        });
    }
}
