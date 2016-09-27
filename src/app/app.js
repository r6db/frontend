const m = require("mithril");
const App = require("./components");
const log = require("lib/log").child(__filename);
function main() {
	log.info("mounting app");
	m.mount(document.body, App);
}

document.addEventListener("DOMContentLoaded", main);

window.m = m;
