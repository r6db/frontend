const base = require("./base");
const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");

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
                    chunks: "initial"
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    stats: true,
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
            },
        })
    ],
});
