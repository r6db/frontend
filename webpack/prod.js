const base = require("./base");
const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");

module.exports = merge(base, {
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
            },
        }),
    ],
});
