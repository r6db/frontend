const CACHE_NAME = "r6db-v1.3";

self.addEventListener("install", function(event) {
    console.debug("[sw] install");
    // fetch our manifest and cache all js files
    event.waitUntil(
        fetch("/manifest.json")
            .then(res => res.json())
            .then(manifest => {
                const toCache = Object.keys(manifest)
                    // only cache js and the sprites. images are too flaky for now
                    .filter(key => {
                        const isJS = /\.js$/.test(key) && !/sw\.js/.test(key);
                        const isCSS = /\.css$/.test(key);
                        const isSVG = /\.svg$/.test(key) && !/safari/.test(key);
                        return isJS || isCSS || isSVG;
                    })
                    // map to an array of urls for easier use
                    .reduce((acc, key) => {
                        const url = new URL(manifest[key], location.href);
                        return acc.concat(url.href);
                    }, []);
                return toCache;
            })
            // open the cache
            .then(toCache => caches.open(CACHE_NAME).then(cache => ({ toCache, cache })))
            .then(({ toCache, cache }) =>
                cache
                    .keys()
                    .then(requests => requests.map(req => req.url))
                    .then(cachedUrls => {
                        // find new and stale keys, and update/delete accordingly
                        const toDelete = cachedUrls.filter(cached => toCache.includes(cached) === false);
                        const toAdd = toCache.filter(key => cachedUrls.includes(key) === false);

                        if (toDelete.length) {
                            console.debug("[sw] deleting items", toDelete);
                        }
                        if (toAdd.length) {
                            console.debug("[sw] adding items", toAdd);
                        }

                        const deletedProm = toDelete.length
                            ? Promise.all(toDelete.map(key => cache.delete(key)))
                            : Promise.resolve();
                        const addedProm = cache.addAll(toAdd);

                        return toAdd.length ? cache.addAll(toAdd) : Promise.resolve();
                    }),
            )
            .then(() => self.skipWaiting())
            .catch(err => console.error("[sw] error", err)),
    );
});

self.addEventListener("activate", function(event) {
    console.debug("[sw] activate");
    clients.claim();
    // delete old caches
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.map(c => {
                    if (c !== CACHE_NAME) {
                        console.trace(`[sw] deleting old cache '${c}'`);
                        caches.delete(c);
                    } else {
                        return Promise.resolve();
                    }
                }),
            ),
        ),
    );
});

self.addEventListener("fetch", function(event) {
    if (/r6db\.com/.test(event.request.url)) {
        event.respondWith(
            caches.match(event.request).then(res => {
                if (res) {
                    console.debug(`[sw] cached response for '${event.request.url}'`);
                    return res;
                } else {
                    return fetch(event.request);
                }
            }),
        );
    }
});
