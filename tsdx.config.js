const path = require('node:path');
const copy = require('rollup-plugin-copy');
const bundleSize = require('rollup-plugin-bundle-size');

const DIST_FOLDER = 'dist';

module.exports = {
    rollup(config) {
        config.plugins.push(bundleSize());

        let dts = 'index.d.ts';
        // Write ESM as .mjs to match Node.js expectations.
        if (config.output && config.output.format === 'esm') {
            config.output.file = config.output.file.replace(/\.js$/, '.mjs');
            dts = path.basename(config.output.file, '.mjs') + '.d.mts';
        }
        config.plugins.push(
            copy({
                targets: [
                    // copy declaration file over
                    { src: 'src/types.ts', dest: DIST_FOLDER, rename: dts },
                ],
            })
        );
        return config;
    },
};
