const webpack = require("webpack");
const HappyPack = require("happypack");
const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ExtractCss = new ExtractTextPlugin("css/[name].css");

const autoprefixer = require("autoprefixer");
const mqpacker = require("css-mqpacker");

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: {
        app: ["./src/app/index.js"],
        worker: ["./src/app/worker/index.js"]
    },
    output: {
        path: path.join(__dirname, "../build"),
        // publicPath: "",
        filename: "js/[name].js",
        pathinfo: true
    },
    resolve: {
        alias: {
            "components": path.join(__dirname, "../src/app/components"),
            "lib": path.join(__dirname, "../src/app/lib")
        }
    },
    node: {
        __filename: true
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                cacheDirectory: "./.cache"
            }
        },
        {
            test: /\.scss$/,
            loader: ExtractCss.extract({
                fallbackLoader: "style-loader",
                diable: process.env.NODE_ENV === "production",
                loader: [
                    "css-loader",
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader",
                        query: {
                            sourceMap: false,
                        }
                    }
                ],
            })
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            Promise: "bluebird"
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new HappyPack({
            id: "jsHappy",
            cacheContext: {
                env: process.env.NODE_ENV
            },
            verbose: false,
            loaders: [{
                path: "babel-loader",
                query: {
                    cacheDirectory: "./.cache"
                }
            }]
        }),
        new webpack.ContextReplacementPlugin(/moment[\\\/]lang$/, /^\.\/ (de)$/),
        new CopyWebpackPlugin([
            { from: "src/*.html", to: "[name].[ext]" },
            { from: "src/assets", to: "assets" },
            { from: "src/favicons/*", to: "[name].[ext]" },
        ]),
        new webpack.LoaderOptionsPlugin({
            options: {
                sassLoader: {
                    includePaths: [
                        path.resolve(__dirname, "../src/scss")
                    ],
                    sourceMap: true
                },
                postcss: [autoprefixer(), mqpacker()]
            }
        }),
        ExtractCss
    ]
};
