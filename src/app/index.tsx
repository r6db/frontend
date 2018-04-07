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

if ("serviceWorker" in navigator) {
    console.debug("[sw] supported");
    navigator.serviceWorker.register("/sw.js");
}

const history = createHistory();
const store = configureStore(history);
// pass store to analytics
setStore(store);

function initAds() {
    if ((window as any).ads) {
        console.log("ads already loaded");
        return;
    }
    const el: HTMLScriptElement = document.createElement("script");
    el.id = "ads";
    el.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    el.onload = function() {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
    };
    el.onerror = function() {
        console.log("ads blocked");
    };
    document.head.appendChild(el);
}
if (process.env.NODE_ENV === "production") {
    initAds();
}

const mount = document.querySelector("#mount");
console.log("mounting app");
const render = Node => ReactDOM.render(Node, mount);
render(<RootComponent store={store} />);

if (module.hot) {
    module.hot.accept();
    render(<RootComponent store={store} />);
}
