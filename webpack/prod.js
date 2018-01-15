const base = require("./base");
const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");

module.exports = merge(base, {
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                // fix when "production" doesn't break the build any more
                // this calls the minifier in .babelrc
                NODE_ENV: JSON.stringify("prod"),
            },
        }),
    ],
});
