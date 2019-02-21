const useBabel = typeof process.env.NODE_ENV === 'undefined' ||
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'testing';

module.exports = (moduleName) => {
    moduleName = moduleName.replace(/[^\w/]/g, '');

    if (useBabel) {
        // eslint-disable-next-line global-require
        require('babel-register');
    }

    // eslint-disable-next-line import/no-dynamic-require, global-require
    const imports = require(`./${useBabel ? 'src' : 'build'}/${moduleName}`);

    return imports.default ? Object.assign(imports.default, imports) : imports;
};
