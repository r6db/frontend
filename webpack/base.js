const webpack = require("webpack");
const path = require("path");
const util = require("util");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");

const DIST = path.join(__dirname, "../build");

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: {
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
    stats: "errors-only",
    devtool: "source-map",
    optimization: {
        removeEmptyChunks: true,
        runtimeChunk: true,
        splitChunks: {
            chunks: "async",
            name: true,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "initial"
                }
            }
        }
    },
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
                test: /.svg$/,
                use: {
                    loader: "svg-sprite-loader",
                    options: {
                        extract: true,
                    },
                },
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: "responsive-loader",
                        options: {
                            sizes: [320, 640, 1200, 2000],
                            placeholder: true,
                            placeholderSize: 40,
                            quality: 85,
                            adapter: require('responsive-loader/sharp')
                        },
                    },
                    {
                        loader: "file-loader",
                        options: {},
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CopyWebpackPlugin([
            // { from: "src/assets", to: "assets" },
            { from: "src/favicons/*", to: "[name].[ext]" },
            { from: "src/*.html", to: "[name].html" },
            { from: "src/*.txt", to: "[name].txt" },
        ]),
        new HtmlWebpackPlugin({
            template: "./src/index.ejs",
        }),
        new SpriteLoaderPlugin(),
    ],
};
