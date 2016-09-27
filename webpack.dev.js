const isProd = process.env.NODE_ENV === "production";

const webpack = require("webpack");
const path = require("path");
var basedir = path.join(__dirname, "src");

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
			"app$": path.join(__dirname, "./src/app/app.js"),
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
			loader: "babel"
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
	]
};
