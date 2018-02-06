const webpack = require("webpack");
const path = require("path");
const util = require("util");

const NameAllModulesPlugin = require("name-all-modules-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const CleanPlugin = require("clean-webpack-plugin");
const { CheckerPlugin, TsConfigPathsPlugin } = require("awesome-typescript-loader");
const workboxPlugin = require("workbox-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const autoprefixer = require("autoprefixer");
const mqpacker = require("css-mqpacker");
const nano = require("cssnano");
const cssdedupe = require("postcss-discard-duplicates");

const DIST = path.join(__dirname, "../build");

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: {
        vendor: [
            "react",
            "react-dom",
            "redux",
            "redux-first-router",
            "redux-first-router-link",
            "redux-localstorage",
            "redux-thunk",
            "history",
            "isomorphic-fetch",
        ],
        app: ["./src/app/index.ts"],
    },
    output: {
        path: DIST,
        publicPath: "/",
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].js",
    },
    target: "web",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            components: path.join(__dirname, "../src/app/components"),
            lib: path.join(__dirname, "../src/app/lib"),
            assets: path.join(__dirname, "../src/assets"),
        },
    },
    node: {
        __filename: true,
    },
    stats: "minimal",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: "./.cache",
                    },
                },
            },
            {
                test: /\.tsx?$/,
                use: [
                    { loader: "react-hot-loader/webpack" },
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: "./.cache",
                        },
                    },
                    { loader: "ts-loader" },
                ],
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: "css-loader" },
                        { loader: "postcss-loader" },
                        {
                            loader: "sass-loader",
                            options: { includePaths: [path.resolve(__dirname, "../src")] },
                        },
                    ],
                }),
            },
            {
                test: /.svg$/,
                use: {
                    loader: "svg-sprite-loader",
                    options: {
                        extract: true,
                    },
                },
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {},
                    },
                    // {
                    //     loader: "image-webpack-loader",
                    //     options: {
                    //         bypassOnDebug: true,
                    //     },
                    // },
                ],
            },
        ],
    },
    plugins: [
        new CleanPlugin(["build/*"]),
        new DashboardPlugin(),
        new TsConfigPathsPlugin(),
        new CheckerPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity,
            children: true,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "app",
        }),
        new CopyWebpackPlugin([
            { from: "src/assets", to: "assets" },
            { from: "src/favicons/*", to: "[name].[ext]" },
            { from: "src/maintenance.html", to: "maintenance.html"}
        ]),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer(),
                    mqpacker(),
                    cssdedupe(),
                    nano({
                        reduceIdents: false,
                        zindex: false,
                    }),
                ],
            },
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.ejs",
        }),
        new SpriteLoaderPlugin(),
        new ExtractTextPlugin({ filename: "styles.[contenthash].css", allChunks: true }),
        new workboxPlugin({
            globPatterns: ['*.{html,js,css,svg}'],
            swDest: path.join(DIST, 'sw.js'),
            clientsClaim: true,
            skipWaiting: true,
        })
    ],
};
