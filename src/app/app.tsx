import * as React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
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
    (window as any).React = React;
}

store.dispatch(initAction);

function init(App: any) {
    const mount = document.querySelector("#mount");
    console.log("mounting app");
    mount.innerHTML = "";
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App />
            </Provider>
        </AppContainer>,
        mount,
    );
}

if (document.readyState === "interactive" || document.readyState === "complete") {
    init(App);
} else {
    window.addEventListener("DOMContentLoaded", () => init(App));
}
