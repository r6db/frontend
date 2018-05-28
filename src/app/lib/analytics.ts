import uuid from "lib/uuid";

// generate an id for this session
// => find popular page sequences
const sessionId = uuid();
const analyticsUrl = false;
let store;

// collect stats to push to analytics
const browserStats = {
    // this sessions id
    id: sessionId,
    // the useragent => browser + version  (+ is iphone)
    ua: navigator.userAgent,
    // size of the browser window
    res: `${window.outerWidth}x${window.outerHeight}`,
    // siye of the content area
    ires: `${window.innerWidth}x${window.innerHeight}`,
    // prefered language
    l: navigator.language,
    // prefill the path
    p: ""
};

// expose a function for the init file to set the store
export function setStore(s) {
    store = s;
}

/**
 * send a page view to the analytics server
 */
export function pageView(title: string, path?: string) {
    // return early if we're in dev, or no url is set
    if (process.env.NODE_ENV !== "production" || !analyticsUrl) {
        return;
    }
    // also return early if the user didn't opt in
    if (!store || !store.settings || !store.settings.analytics) {
        return;
    }
    const p = path || store.getState().location.pathname;
    console.debug("pageView", { ...browserStats, p });

    fetch(analyticsUrl, {
        method: "POST",
        // send the browser stats + the route we're on
        body: JSON.stringify({ ...browserStats, p })
    });
}
