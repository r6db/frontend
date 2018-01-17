import * as m from "mithril";
import App from "./components";

import configureStore from "lib/store/index.js";
import { Provider } from "lib/store/connect";
import createHistory from "history/createBrowserHistory";
import { init as initAction } from "lib/store/actions/index.js";
import { setStore } from "lib/analytics.js";

const history = createHistory();
const { store } = configureStore(history);

setStore(store);
store.subscribe(() => requestAnimationFrame(m.redraw));
store.dispatch(initAction);
if (process.env.NODE_ENV === "development") {
    (window as any).store = store;
    (window as any).m = m;
}

function init(App: any) {
    const mount = document.querySelector("#mount");
    console.log("mounting app");
    const Root = {
        view() {
            return m(Provider, { store }, m(App));
        },
    };
    mount.innerHTML = "";
    m.mount(mount, Root);
}

if (document.readyState === "interactive" || document.readyState === "complete") {
    init(App);
} else {
    window.addEventListener("DOMContentLoaded", () => init(App));
}

if (module.hot && process.env.NODE_ENV === "development") {
    module.hot.accept("./components/index", () => {
        const App = require("./components/index").default;
        init(App);
    });
}
