const base = require("./base");
const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const MiniExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const mqpacker = require("css-mqpacker");
const nano = require("cssnano");
const cssdedupe = require("postcss-discard-duplicates");

module.exports = merge(base, {
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: "async",
            name: true,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "initial",
                },
                styles: {
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all",
                    enforce: true,
                },
            },
        },
    },
    stats: true,
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                autoprefixer(),
                                mqpacker(),
                                cssdedupe(),
                                nano({
                                    reduceIdents: false,
                                    zindex: false,
                                }),
                            ],
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: { includePaths: [path.resolve(__dirname, "../src")] },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
                VERSION: process.env.VERSION
            },
        }),
        new MiniExtractPlugin({ filename: "[name].[chunkhash].css", allChunks: true }),
    ],
});
