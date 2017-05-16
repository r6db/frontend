const base = require("./base");
const webpack = require("webpack");

const path = require("path");
const config = Object.assign({}, base);

config.devServer = {
    contentBase: path.resolve("./build"),
    host: "localhost",
    compress: true,
    inline: true,
    hot: true,
    noInfo: true,
    lazy: false,
    port: 9000,
    proxy: [{
        path: "/api",
        target: "https://r6db.com",
        changeOrigin: true
    }],
    historyApiFallback: true,
    clientLogLevel: "error",
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    stats: {
        colors: true,
        context: false,
        hash: true,
        version: false,
        timings: true,
        assets: false,
        chunks: false,
        chunkModules: false,
        modules: false,
        children: false,
        cached: false,
        reasons: false,
        source: false,
        errorDetails: true,
        chunkOrigins: false
    }
};
config.output.publicPath = "/";

config.plugins.push(new webpack.DefinePlugin({
    "process.env": {
        "NODE_ENV": JSON.stringify("development")
    }
}));


module.exports = config;