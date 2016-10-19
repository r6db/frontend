const m = require("mithril");
const App = require("./components");
const log = require("lib/log").child(__filename);
function main() {
	log.info("mounting app");
	m.mount(document.body, App);
}

window.addEventListener("load", main);
