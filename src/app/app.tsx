import Inferno from "inferno";
import Provider from "inferno-redux";
import App from "./components";

import configureStore from "lib/store/index.js";
import createHistory from "history/createBrowserHistory";
import { init as initAction } from "lib/store/actions/index.js";
import { setStore } from "lib/analytics.js";

const history = createHistory();
const { store } = configureStore(history);

if (process.env.NODE_ENV === "development") {
    (window as any).store = store;
}

store.dispatch(initAction);

function init(App: any) {
    const mount = document.querySelector("#mount");
    console.log("mounting app");
    const Root = function () {
        return (
            <Provider store= { store } >
                <App />
            </Provider>
        );
    };
    mount.innerHTML = "";
    Inferno.render(<Root />, mount);
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
