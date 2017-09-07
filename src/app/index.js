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

/**
 * load analytics
 */

const _paq = _paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(["setCookieDomain", "*.r6db.com"]);
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
  const u="//anal.r6db.com/";
  _paq.push(['setTrackerUrl', u+'p.php']);
  _paq.push(['setSiteId', '1']);
  const d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'p.js'; s.parentNode.insertBefore(g,s);
})();


if (process.env.NODE_ENV !== "production"){
    // expose libs;
    window.m = m;
    window.api = api;
}

require("./app");
