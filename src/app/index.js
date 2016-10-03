/**
 * this is the app's entry point
 */
require("./app");

if(process.env.NODE_ENV === "development") {
	const page = require("page");
	window.page = page;

	const m = require("mithril");
	window.m = m;
}
