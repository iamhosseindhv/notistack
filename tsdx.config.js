const bundleSize = require('rollup-plugin-bundle-size');

module.exports = {
    rollup(config) {
        config.plugins.push(bundleSize());
        return config;
    },
};
