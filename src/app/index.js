/**
 * this is the app's entry point
 */
import "./app";
import "../scss/styles.scss";
import * as page from "page";
import m from "mithril";

if (process.env.NODE_ENV === "development") {
    window.page = page;
    window.m = m;
} else {
    (function (i, s, o, g, r, a, m) {
        i["GoogleAnalyticsObject"] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments);
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m);
    })(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");
    ga("create", "UA-86120096-1", "auto");
}
