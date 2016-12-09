const m = require("mithril");
const App = require("./components");
const log = require("lib/log").child(__filename);
function main() {
    const mount = document.querySelector("#mount");
    log.info("mounting app");
    mount.innerHTML = "";
    m.mount(mount, App);
}

window.addEventListener("DOMContentLoaded", main);
