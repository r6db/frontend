const webpack = require("webpack");
const path = require("path");
const util = require("util");

const DashboardPlugin = require("webpack-dashboard/plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const autoprefixer = require("autoprefixer");
const mqpacker = require("css-mqpacker");
const nano = require("cssnano");
const cssdedupe = require("postcss-discard-duplicates");

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: {
        app: ["./src/app/index.js"],
    },
    output: {
        path: path.join(__dirname, "../build"),
        publicPath: "/",
        filename: "[name].[hash].js",
        chunkFilename: "[name].[hash].js",
        pathinfo: true,
    },
    target: "web",
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            components: path.join(__dirname, "../src/app/components"),
            lib: path.join(__dirname, "../src/app/lib"),
            assets: path.join(__dirname, "../src/assets"),
        },
        extensions: [".js", ".jsx", ".ts", ".tsx"],
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
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: "css-loader" },
                        { loader: "postcss-loader" },
                        { loader: "sass-loader", options: { includePaths: [path.resolve(__dirname, "../src")] } },
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
                    {
                        loader: "image-webpack-loader",
                        options: {
                            bypassOnDebug: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new DashboardPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CopyWebpackPlugin([{ from: "src/assets", to: "assets" }, { from: "src/favicons/*", to: "[name].[ext]" }]),
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
        new ExtractTextPlugin({ filename: "styles.css", allChunks: true }),
        new webpack.NamedModulesPlugin(),
    ],
};
