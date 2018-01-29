// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const mqpacker = require("css-mqpacker");
const nano = require("cssnano");
const cssdedupe = require("postcss-discard-duplicates");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");


module.exports = {
  context: path.resolve(__dirname, "../"),
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      components: path.join(__dirname, "../src/app/components"),
      lib: path.join(__dirname, "../src/app/lib"),
      assets: path.join(__dirname, "../src/assets")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: "react-hot-loader/webpack" },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: "./.cache"
            }
          },
          { loader: "ts-loader" }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader"},
          { loader: "css-loader" },
          { loader: "postcss-loader" },
          {
            loader: "sass-loader",
            options: { includePaths: [path.resolve(__dirname, "../src")] }
          }
        ]
      },
      {
        test: /.svg$/,
        use: {
          loader: "svg-sprite-loader",
          options: {
            extract: true
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          },
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //     template: "./src/index.ejs",
    // }),
    new SpriteLoaderPlugin(),
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
  ]
};
