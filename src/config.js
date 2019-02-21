import ms from 'ms';

const {
    NODE_ENV = 'development',
    PORT = 3000,
    SECRET = 'demo secret',
    DEBUG,
    LOG_ALL_ERRORS
} = process.env;

const envName = ['development', 'staging', 'production', 'testing'].includes(NODE_ENV) ? NODE_ENV : 'development';
const isDevelopment = envName === 'development';
const isStaging = envName === 'staging';
const isProduction = envName === 'production';
const isTesting = envName === 'testing';

const config = {
    env: {
        name: envName,
        isDevelopment,
        isStaging,
        isProduction,
        isTesting
    },
    debug: typeof DEBUG !== 'undefined',
    app: {
        port: PORT
    },
    auth: {
        secret: SECRET,
        session: false,
        codeVerification: {
            expiresIn: ms('1d')
        },
        jwtOptions: {
            issuer: 'flightcall',
            expiresIn: '100y'
        }
    },
    LOG_ALL_ERRORS
};

export default config;
