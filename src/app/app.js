import m from "mithril";
import App from "./components";
import Log from "lib/log";
const log = Log.child(__filename);

function main() {
    const mount = document.querySelector("#mount");
    log.info("mounting app");
    mount.innerHTML = "";
    m.mount(mount, App);
}

window.addEventListener("DOMContentLoaded", main);
