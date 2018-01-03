const webpack = require("webpack");
const path = require("path");
const util = require("util");

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
        app: ["./src/app/index.js"]
    },
    output: {
        path: path.join(__dirname, "../build"),
        publicPath: "/",
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js",
        pathinfo: true
    },
    target: "web",
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            "components": path.join(__dirname, "../src/app/components"),
            "lib": path.join(__dirname, "../src/app/lib"),
            "assets": path.join(__dirname, "../src/assets")
        },
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    node: {
        __filename: true
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    cacheDirectory: "./.cache"
                }
            }
        }, {
            test: /.svg$/,
            use: {
                loader: "svg-sprite-loader",
                options: {
                    extract: true
                }
            },
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [
                    { loader: "css-loader" },
                    { loader: "postcss-loader" },
                    { loader: "sass-loader", options: { includePaths: [path.resolve(__dirname, "../src")] } }
                ],
            })
        } ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),        
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CopyWebpackPlugin([
            { from: "src/assets", to: "assets" },
            { from: "src/favicons/*", to: "[name].[ext]" },
        ]),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer(), mqpacker(), cssdedupe(), nano()]
            }
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.ejs",
            hash: true
        }),
        new SpriteLoaderPlugin(),
        new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.(js|html|css)$/,
			threshold: 10240,
			minRatio: 0.8
		}),
        new ExtractTextPlugin({ filename: "styles.css", allChunks: true }),
    ]
};
