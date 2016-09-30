const m = require("mithril");
const App = require("./components");
const log = require("lib/log").child(__filename);
function main() {
	log.trace("clearing body");
	document.body.innerHTML = "";
	log.info("mounting app");
	m.mount(document.body, App);
}

window.addEventListener("load", main);
window.addEventListener("unload", function() {
	m.render(document.body, App);
});

window.m = m;
