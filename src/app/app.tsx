import * as Inferno from "inferno";
import { Provider } from "inferno-redux";
import App from "./components";

import configureStore from "lib/store";
import createHistory from "history/createBrowserHistory";
import { init as initAction } from "lib/store/actions";
import { setStore } from "lib/analytics";

const history = createHistory();
const { store } = configureStore(history);
setStore(store);

if (process.env.NODE_ENV === "development") {
    (window as any).store = store;
    (window as any).Inferno = Inferno;
}

store.dispatch(initAction);

function init(App: any) {
    const mount = document.querySelector("#mount");
    console.log("mounting app");
    mount.innerHTML = "";
    Inferno.render(
        <Provider store={store}>
            <App />
        </Provider>,
        mount,
    );
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
