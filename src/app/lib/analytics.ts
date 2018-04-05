export const TRACKING_ID = "UA-86120096-1";

let store;

export function setStore(s) {
    store = s;
}
/* eslint-disable camelcase */
export function pageView(title: string, path?: string) {
    if (process.env.NODE_ENV !== 'production') { return; }
    console.debug('pageView', { title, path });
    if (!store) {
        return;
    }
    if ((window as any).gtag) {
        const p = path || store.getState().location.pathname;
        (window as any).gtag("config", TRACKING_ID, {
            //eslint-ignore
            page_path: p,
            page_title: title,
        });
        // (window as any).gtag("event", "page_view");
    }
}
export function search(query) {
    if (process.env.NODE_ENV !== 'production') { return; }
    if ((window as any).gtag) {
        (window as any).gtag("event", "search", { search_term: query });
    }
}

export function event(name, opts) {
    if (process.env.NODE_ENV !== 'production') { return; }
    if ((window as any).gtag) {
        (window as any).gtag("event", name, opts);
    }
}
/* eslint-enable camelcase */
