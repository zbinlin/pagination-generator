"use strict";

export default {
    input: "./index.mjs",
    output: {
        format: "umd",
        file: "./index.umd.js",
        name: "paginationGenerate",
        sourcemap: true,
        exports: "named",
    },
};
