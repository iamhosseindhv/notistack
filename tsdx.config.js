const copy = require('rollup-plugin-copy');
const bundleSize = require('rollup-plugin-bundle-size');

const DIST_FOLDER = 'dist';

module.exports = {
    rollup(config) {
        config.plugins.push(bundleSize());
        config.plugins.push(
            copy({
                targets: [
                    // copy decleration file over
                    { src: 'src/types.ts', dest: DIST_FOLDER, rename: 'index.d.ts' },
                    // and a bunch of other things
                    { src: 'package.json', dest: DIST_FOLDER },
                    { src: 'README.md', dest: DIST_FOLDER },
                    { src: 'LICENSE.md', dest: DIST_FOLDER },
                ]
            })
        );
        return config;
    },
};
