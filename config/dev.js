const base = require("./base");
const webpack = require("webpack");

const path = require("path");
const config = Object.assign({}, base);

config.devServer = {
    contentBase: path.resolve("./build"),
    host: "0.0.0.0",
    compress: true,
    inline: true,
    hot: true,
    noInfo: true,
    lazy: false,
    port: 9000,
    disableHostCheck: true,
    proxy: [{
        path: "/api",
        target: "https://new.r6db.com",
        changeOrigin: true
    }],
    historyApiFallback: true,
    clientLogLevel: "error",
    watchOptions: {
        aggregateTimeout: 100,
        poll: 500
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

config.module.rules.push({
    test: /\.scss$/,
    use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
        { loader: "postcss-loader" },
        { loader: "sass-loader", options: { includePaths: [path.resolve(__dirname, "../src")]} }
    ]
});
config.plugins.push(new webpack.NamedModulesPlugin());
config.plugins.push(new webpack.DefinePlugin({
    "process.env": {
        "NODE_ENV": JSON.stringify("development")
    }
}));


module.exports = config;