/**
 * load analytics
 */

export default new Promise((resolve, reject) => {
    const analyticsDomain = "http://anal.r6db.com/";
    const _paq = _paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(["setCookieDomain", "*.r6db.com"]);
    _paq.push(["setDomains", ["*.r6db.com"]]);
    _paq.push(["setDoNotTrack", true]);
    _paq.push(["disableCookies"]);
    _paq.push(["enableLinkTracking"]);
    _paq.push(["setTrackerUrl", analyticsDomain + "p.php"]);
    _paq.push(["setSiteId", "1"]);
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
