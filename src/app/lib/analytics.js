const TRACKING_ID = "UA-86120096-1";

let store;

export function setStore(s) {
    store = s;
}

/* eslint-disable camelcase */
export function pageView(title) {
    if (!store) {
        return;
    }
    const path = store.getState().location.pathname;
    if (gtag) {
        gtag("config", TRACKING_ID, {
            //eslint-ignore
            page_path: path,
            page_title: title,
        });
        gtag("event", "page_view");
    }
}
export function search(query) {
    if (gtag) {
        gtag("event", "search", { search_term: query });
    }
}

export function event(name, opts) {
    if (gtag) {
        gtag("event", name, opts);
    }
}
/* eslint-enable camelcase */
