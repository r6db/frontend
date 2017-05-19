import * as m from "mithril";
import App from "./components";

function main() {
    const mount = document.querySelector("#mount");
    console.info("mounting app");
    mount.innerHTML = "";
    m.mount(mount, App);
}

if(document.readyState === "interactive" || document.readyState === "complete") {
    main();
} else {
    window.addEventListener("load", main);
}
