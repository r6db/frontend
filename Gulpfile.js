"use strict";
const isProd = (process.env.NODE_ENV === "production");


const gulp = require("gulp");
const gutil = require("gulp-util");

/* JS */
const webpack = require("webpack");

/* CSS */
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const mqpacker = require("css-mqpacker");
const nano = require("cssnano");

// define the used globs
const paths = {
	dist: "./build/",
	src: "./src/"
};

/*
####################
 Setup
####################
 */


// define the used webpack config
let config;
// define the postcss plugins
let plugins;

if (isProd) {
	console.log(`
	######################################
	##                                  ##
	##            PROD BUILD            ##
	##                                  ##
	######################################
	`);
	config = require("./webpack.prod");
	plugins = [autoprefixer(), mqpacker(), nano()];
} else {
	config = require("./webpack.dev");
	plugins = [autoprefixer()];
}
let compiler = webpack(config);



// run webpack
gulp.task("build:js", function(done) {
	compiler.run(function(err, stats) {
		if (err) {
			done(err);
			process.exit(1);
			throw err;
		} else {
			gutil.log(stats.toString("errors-only"));
			// fail build on prod
			if (process.env.NODE_ENV === "production" && stats.compilation.errors && stats.compilation.errors.length) {
				process.exit(1);
			}
			done();
		}
	});
});

gulp.task("watch:js", function(done) {
	compiler.watch({}, function(err, stats) {
		if (err) {
			done(err);
			process.exit(1);
			throw err;
		} else {
			gutil.log(stats.toString({
				version: false,
				hash: false,
				chunks: false,
				chunkModules: false,
				assets: false,
				colors: true,
				timings: true,
				errorDetails: true
			}));
		}
	})
});

gulp.task("build:css", function() {
	gulp.src(paths.src + "scss/**/*.scss")
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(plugins))
		.pipe(gulp.dest(paths.dist + "css"));
});

gulp.task("move:assets", function() {
	return gulp.src(paths.src + "assets/**/*")
		.pipe(gulp.dest(paths.dist + "assets/"));
});

gulp.task("move:html", function() {
	return gulp.src(paths.src + "*.html")
		.pipe(gulp.dest(paths.dist));
});

gulp.task("setup:watchers", function() {
	gulp.watch(paths.src + "scss/**/*.scss", ["build:css"]);
	gulp.watch(paths.src + "*.html", ["move:html"]);
});


gulp.task("default", ["move:html", "move:assets", "build:css", "watch:js", "setup:watchers"]);
gulp.task("build", ["move:html", "move:assets", "build:js", "build:css"]);
