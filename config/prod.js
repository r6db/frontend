const base = require("./base");
const webpack = require("webpack");
const os = require("os");
const path = require("path");

const UglifyJsParallelPlugin = require("webpack-uglify-parallel");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

const config = Object.assign({}, base);


config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify("production")
        }
    }),
    new UglifyJsParallelPlugin({
        workers: os.cpus().length,
        compress: {
            dead_code: true,
            drop_debugger: true,
            drop_console: true,
            warnings: false
        }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackInlineSourcePlugin()
]);

module.exports = config;