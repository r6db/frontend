const base = require("./base");
const webpack = require("webpack");
const path = require("path");

const autoprefixer = require("autoprefixer");
const mqpacker = require("css-mqpacker");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = Object.assign({}, base);
// config.output.publicPath = "https://r6db.com/";


/**
 * setup extract-text-plugin
 */

config.module.rules.push({
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    use: [
      { loader: "css-loader" },
      { loader: "postcss-loader" },
      { loader: "sass-loader", options: { includePaths: [path.resolve(__dirname, "../src")]} }
    ],
  })
});



config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify("production")
        }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        dead_code: true,
        drop_debugger: true,
        drop_console: true,
        warnings: false
      },
      comments: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin("styles.css"),
]);




module.exports = config;