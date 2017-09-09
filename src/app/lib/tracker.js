/**
 * load analytics
 */

const tracker = new Promise((resolve, reject) => {
    const analyticsDomain = "https://anal.r6db.com/";
    window._paq = window._paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    window._paq.push(["setCookieDomain", "*.r6db.com"]);
    window._paq.push(["setDomains", ["*.r6db.com"]]);
    window._paq.push(["setDoNotTrack", true]);
    window._paq.push(["disableCookies"]);
    window._paq.push(["enableLinkTracking"]);
    window._paq.push(["setTrackerUrl", analyticsDomain + "p.php"]);
    window._paq.push(["setSiteId", "1"]);
    const d = document,
    g = d.createElement("script"),
    s = d.getElementsByTagName("script")[0];
    g.type = "text/javascript";
    g.async = true;
    g.defer = true;
    g.src = analyticsDomain + "p.js";
    s.parentNode.insertBefore(g, s);
    g.addEventListener("load", onLoad);
    g.addEventListener("error", reject);

    function onLoad() {
        const tracker = Piwik.getTracker(analyticsDomain + "p.php", "1");
        resolve(tracker);
    }
});

export function trackPageView(title) {
    tracker.then(t => t.trackPageView(title));
}

export function trackSiteSearch(query, category, numResults) {
    tracker.then(t => t.trackSiteSearch(query, category, numResults));
}
export function trackEvent(category, action, name, value) {
    tracker.then(t => t.trackEvent(category, action, name, value));
}
export function trackGoal(goal, value) {
    tracker.then(t => t.trackGoal(goal, value));
}