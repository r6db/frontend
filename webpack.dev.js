const isProd = process.env.NODE_ENV === "production";

const webpack = require("webpack");
const path = require("path");
var basedir = path.join(__dirname, "src");

module.exports = {
	context: __dirname,
	entry: "./src/app/index.js",
	output: {
		path: path.join(__dirname, "./build/js"),
		filename: "app.js"
	},
	resolve: {
		alias: {
			"app$": path.join(__dirname, "./src/app/app.js"),
			"services": path.join(__dirname, "./src/app/Services")
		}
	},
	devtool: "source-map",
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
	],
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel"
		}, {
			test: /\.html$/,
			loader: 'raw'
		}]
	}
};
