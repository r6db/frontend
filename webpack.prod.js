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
			"services": path.join(__dirname, "./src/app/Services")

		}
	},
	devtool: "cheap-source-map",
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.ProvidePlugin({
			Promise: "bluebird"
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				dead_code: true,
				drop_debugger: true,
				drop_console: true,
				warnings: false
			},
			define: {
				"process.env.NODE_ENV": true
			}
		})
	],
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: "babel"
		}]
	}
};
