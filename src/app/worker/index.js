import "whatwg-fetch";

import { tap } from "./utils";
import { methods } from "./method";
import Cache from "./cache";

const caches = {};

const maybeMap = (fn, args) => payload =>
    (typeof fn === "function")
        ? fn(payload, args)
        : payload;

// load methods
const requireAll = r => r.keys().map(r);
requireAll(require.context("./methods"));
self.onmessage = function workerReceive(e)  {

    const { id, method, params, timing } = e.data;
    let cache = caches[method];
    if(!cache) {
        cache = caches[method] = new Cache(1000*60*15);
    }

    if (methods[method]) {
        timing.workerStart = Date.now();

        const payload = cache.get(JSON.stringify(params));
        if(payload) {
            console.log("found item in cache");
            timing.filter = Date.now();
            timing.processing = Date.now();
            timing.workerEnd = Date.now();
            return self.postMessage({ id, method, payload, timing, params });
        }

        // get method
        const task = methods[method].getTask();
        // grab the data
        task.acquire(params)
            // start filtering
            .then(tap(() => timing.filter = Date.now()))
            .then(maybeMap(task.filter, params))
            // start processing
            .then(tap(() => timing.processing = Date.now()))
            .then(maybeMap(task.process, params))
            // return data
            .then(tap(() => timing.workerEnd = Date.now()))
            .then(function (payload) {
                // respond
                cache.set(JSON.stringify(params), payload);
                self.postMessage({ id, method, payload, timing, params });
            })
            .catch(function (error)  {
                if (error.then) {
                    // error is a promise?
                    return error.then(function (res) {
                        const error = res.error ||  res;
                        timing.workerEnd = Date.now();
                        self.postMessage({ id, method, error, timing, params });
                    });
                } else {
                    // map to serializable form
                    if (error instanceof Error) {
                        error = {
                            message: error.message,
                            stack: error.stack
                        };
                    }
                    timing.workerEnd = Date.now();
                    self.postMessage({ id, method, error, timing, params });
                }
            });
    } else {
        self.postMessage({ id, method, timing, params, error: "method not found" });
    }
};
