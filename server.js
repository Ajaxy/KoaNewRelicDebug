require('dotenv/config');
require('@newrelic/koa');
const envRequire = require('./envRequire');

const init = envRequire('app');

init();
