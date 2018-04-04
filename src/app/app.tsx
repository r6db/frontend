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
// pass store to analytics
setStore(store);

function initAds() {
    const el: HTMLScriptElement = document.createElement("script");
    el.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    el.onload = function () {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
    }
    el.onerror = function(){ console.log('ads blocked'); };
    document.head.appendChild(el);
}

initAds();



if (process.env.NODE_ENV === "development") {
    (window as any).store = store;
    (window as any).React = React;
}

store.dispatch(initAction);
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