/// <reference path="../../declarations.d.ts" />
/**
 * this is the app's entry point
 */

// import polyfills
import "@babel/polyfill";
import "isomorphic-fetch";
import * as React from "react";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import ReactDOM from "react-dom";
import RootComponent from "./components";
import configureStore from "lib/store";
import { setStore } from "lib/analytics";
import * as Raven from "raven-js";

if (process.env.NODE_ENV === "production" && process.env.VERSION) {
    Raven.config("https://9bf8160273c04484a3b5ced1cf1d61cf@sentry.r6db.com/2", {
        release: process.env.VERSION
    }).install();
}

if ("serviceWorker" in navigator) {
    console.debug("[sw] supported");
    navigator.serviceWorker.register("/sw.js");
}

const history = createHistory();
const store = configureStore(history);
// pass store to analytics
setStore(store);

// mount app
const mount = document.querySelector("#mount");
const render = Node => ReactDOM.render(Node, mount);

if (!global.Intl) {
    console.log("browser doesn't support Internationalization API, require polyfill");
    import("intl").then(() => import("intl/locale-data/jsonp/en"))
    .then(() => render(<RootComponent store={store} />));
} ekse {
    render(<RootComponent store={store} />)
}


if (module.hot) {
    module.hot.accept();
    render(<RootComponent store={store} />);
}
