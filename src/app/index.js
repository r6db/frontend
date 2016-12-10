/**
 * this is the app's entry point
 */
import "../scss/styles.scss";
import * as page from "page";
import Log from "lib/log";

import m from "mithril";

if (process.env.NODE_ENV === "production") {
    Log.setLevel(10);
    // run google analytics
    (function (i, s, o, g, r, a, m) {
        i["GoogleAnalyticsObject"] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments);
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m);
    })(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");
    ga("create", "UA-86120096-1", "auto");
} else {
    window.page = page;
    window.m = m;
    Log.setLevel(50);
    window["GoogleAnalyticsObject"] = window.ga = function() {};
}

require("./app");
