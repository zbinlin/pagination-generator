"use strict";

export default {
    input: "./index.js",
    output: {
        format: "umd",
        file: "./index.umd.js",
        name: "paginationGenerate",
        sourcemap: true,
        exports: "named",
    },
};
