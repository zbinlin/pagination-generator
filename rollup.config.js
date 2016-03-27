"use strict";

import babel from "rollup-plugin-babel";

export default {
    entry: "./index.js",
    dest: "./index.umd.js",
    format: "umd",
    moduleName: "paginationGenerate",
    sourceMap: true,
    plugins: [
        babel({
            presets: "es2015-rollup",
        }),
    ],
};
