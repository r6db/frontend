const base = require("./base");
const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const autoprefixer = require("autoprefixer");
const mqpacker = require("css-mqpacker");

/* eslint-disable camelcase */
module.exports = merge(base, {
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                dead_code: true,
                drop_debugger: true,
                drop_console: true,
                warnings: false
            },
            comments: false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
    ]
});

/* eslint-enable camelcase */
