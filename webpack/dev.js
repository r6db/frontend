const base = require("./base");
const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");

module.exports = merge(base, {
    devServer: {
        contentBase: path.resolve("./build"),
        host: "0.0.0.0",
        compress: true,
        inline: true,
        hot: true,
        noInfo: true,
        lazy: false,
        port: 9000,
        disableHostCheck: true,
        proxy: [
            {
                path: "/api",
                target: "https://r6db.com",
                changeOrigin: true,
            },
        ],
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 100,
            poll: 500,
        },
    },

    output: {
        path: path.join(__dirname, "../build"),
        publicPath: "/",
        filename: "[name].js",
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
            },
        }),
    ],
});
