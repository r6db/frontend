import * as m from "mithril";
import App from "./components";

import configureStore from "./lib/store";
import { Provider } from "./lib/store/connect";
import createHistory from "history/createBrowserHistory";
import { init as initAction } from "lib/store/actions";

import queryString from "query-string";

const query = queryString.parse(window.location.search);

const history = createHistory();
const { store } = configureStore(history);

store.subscribe(() => m.redraw());
store.dispatch(initAction);

window.store = store;

function init(App) {
    const mount = document.querySelector("#mount");
    console.log("mounting app");
    const Root = {
        view() {
            return (
                <Provider store={store}>
                    <App />
                </Provider>
            );
        }
    }
    mount.innerHTML = "";
    m.mount(mount, Root);
}

if ( document.readyState === "interactive" || document.readyState === "complete") {
    init(App);
} else {
    window.addEventListener("load", () => init(App));
}

if (module.hot && process.env.NODE_ENV === "development") {
    module.hot.accept("./components/index", () => {
        const App = require("./components/index").default;
        init(App);
    });
}
