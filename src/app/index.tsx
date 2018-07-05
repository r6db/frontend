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
Raven.config(
    "https://9bf8160273c04484a3b5ced1cf1d61cf@sentry.r6db.com/2"
).install();

if ("serviceWorker" in navigator) {
    console.debug("[sw] supported");
    navigator.serviceWorker.register("/sw.js");
}

const history = createHistory();
const store = configureStore(history);
// pass store to analytics
setStore(store);

const mount = document.querySelector("#mount");
console.log("mounting app");
const render = Node => ReactDOM.render(Node, mount);
render(<RootComponent store={store} />);

if (module.hot) {
    module.hot.accept();
    render(<RootComponent store={store} />);
}
