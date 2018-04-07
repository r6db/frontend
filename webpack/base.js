const webpack = require("webpack");
const path = require("path");
const util = require("util");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
// const ManifestPlugin = require("webpack-assets-manifest");

const DIST = path.join(__dirname, "../build");

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: {
        app: ["./src/app/index.tsx"],
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
        splitChunks: {
            chunks: "async",
            name: true,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "initial",
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: [
                    { loader: "cache-loader" },
                    { loader: "thread-loader" },
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: "./.cache",
                        },
                    },
                ],
            },
            {
                test: /.svg$/,
                use: [
                    {
                        loader: "svg-sprite-loader",
                        options: {
                            extract: true,
                        },
                    },
                    {
                        loader: "svgo-loader",
                        options: {
                          plugins: [
                            {convertShapeToPath: false},
                          ]
                        }
                    },
                ],
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: "responsive-loader",
                        options: {
                            sizes: [320, 640, 1200, 1600, 1920, 2440],
                            placeholder: true,
                            placeholderSize: 40,
                            quality: 85,
                            adapter: require("responsive-loader/sharp"),
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
        new ManifestPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CopyWebpackPlugin([
            // { from: "src/assets", to: "assets" },
            { from: "src/favicons/*", to: "[name].[ext]" },
            { from: "src/*.html", to: "[name].html" },
            { from: "src/*.txt", to: "[name].txt" },
            { from: "src/app/sw.js", to: "[name].js" },
            { from: "src/app.json", to: "[name].json" },
        ]),
        new HtmlWebpackPlugin({
            template: "./src/index.ejs",
        }),
        new SpriteLoaderPlugin(),
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
        }),
    ],
};
