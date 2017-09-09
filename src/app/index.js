/**
 * this is the app's entry point
 */

// import polyfills
import "babel-polyfill";
import "isomorphic-fetch";

// import deps
import "../scss/styles.scss";
import * as m from "mithril";
import * as api from "lib/api";

import "lib/tracker";

if (process.env.NODE_ENV !== "production"){
    // expose libs;
    window.m = m;
    window.api = api;
}

require("./app");
