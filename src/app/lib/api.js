let worker;
if (typeof(Worker) !== "undefined") {
    worker = new Worker("/js/worker.js");
} else {
    const Worker = require("pseudo-worker");
    worker = new PseudoWorker("/js/worker.js");
}

import uuid from "lib/uuid";
import Log from "lib/log";
const log = Log.child(__filename);
/**
 * pseudo uuid v4
 * has a fixed format of
 * xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 * pattern
 * where x  in [0-9a-z]
 * and y  in [89ab]
 */
;
function getTiming(timing) {
    log.trace("calculated timings");
    return {
        duration: timing.apiEnd - timing.apiStart,
        xhr: timing.filter - timing.workerStart,
        filter: timing.processing - timing.filter,
        processing: timing.workerEnd - timing.processing,
        transport: timing.apiEnd - timing.workerEnd
    };
}

// cache of open requests (promise, id);
const cache = {};

worker.onmessage = function receive(e) {
    const { id, method, params, payload, error, timing } = e.data;
    timing.apiEnd = Date.now();
    if (cache[id]) {
        const prom = cache[id];
        if (error) {
            log.error(`API error`, {
                id,
                method,
                params,
                error,
                timing: getTiming(timing)
            });
            prom.reject(error);
        } else {
            log.trace(`API response`, {
                id,
                method,
                params,
                timing: getTiming(timing)
            });
            prom.resolve(payload);
        }
        cache[id] = undefined;
    } else {
        log.error("API Error", { error: "unhandled response", id, method, params });
    }
};


function request(method, params = null) {
    return new Promise(function (resolve, reject) {
        const id = uuid();
        const timing = {
            apiStart: Date.now(),
            workerStart: 0,
            processing: 0,
            workerEnd: 0,
            apiEnd: 0
        };
        log.trace("API request", { id, method, params });
        cache[id] = { resolve, reject };
        worker.postMessage({ id, method, params, timing });
    });
}

export default request;
