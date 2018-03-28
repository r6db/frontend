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

function initAnalytics() {
    const el: HTMLScriptElement = document.createElement("script");
    el.src = "https://www.googletagmanager.com/gtag/js?id=UA-86120096-1";
    el.onload = function () {
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args) { (window as any).dataLayer.push(args); }
        gtag('js', new Date());
        gtag('config', 'UA-86120096-1', {
            "app_name": "r6db",
            "send_page_view": false,
            "anonymize_ip": true
        });
    }
    el.onerror = function () { console.log('analytics blocked'); };
    document.head.appendChild(el);
}
function initAds() {
    const el: HTMLScriptElement = document.createElement("script");
    el.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    el.onload = function () {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({
            google_ad_client: "ca-pub-4708879883364551"
        });
    }
    el.onerror = function(){ console.log('ads blocked'); };
    document.head.appendChild(el);
}

initAnalytics();
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