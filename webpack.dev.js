const isProd = process.env.NODE_ENV === "production";
const webpack = require("webpack");
const HappyPack = require("happypack");
const path = require("path");

let basedir = path.join(__dirname, "src");

module.exports = {
	context: __dirname,
	entry: {
		app: "./src/app/index.js",
		worker: "./src/app/worker/index.js"
	},
	output: {
		path: path.join(__dirname, "./build/js"),
		filename: "[name].js"
	},
	resolve: {
		alias: {
			"lib": path.join(__dirname, "./src/app/lib")
		}
	},
	node: {
		__filename: true
	},
	devtool: "source-map",
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "happypack/loader?id=jsHappy"
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("development")
			}
		}),
		new webpack.ProvidePlugin({
			Promise: "bluebird"
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
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
		})
	]
};
