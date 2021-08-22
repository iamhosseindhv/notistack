const copy = require('rollup-plugin-copy');
const bundleSize = require('rollup-plugin-bundle-size');

module.exports = {
    rollup(config) {
        config.plugins.push(bundleSize());
        // copy decleration file over
        config.plugins.push(copy({ targets: [{ src: 'src/types.ts', dest: 'dist', rename: 'index.d.ts' }] }));
        return config;
    },
};
