const worker = new Worker("/js/worker.js");
const log = require("lib/log").child(__filename);
const uuid = require("lib/uuid");
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
let cache = {};

worker.onmessage = function receive(e) {
	let {id, method, params, payload, error, timing} = e.data;
	timing.apiEnd = Date.now();
	if(cache[id]) {
		let prom = cache[id];
		if(error) {
			log.error(`API error`, {
				id,
				method,
				params,
				error,
				timing: getTiming(timing)
			});
			prom.reject(error);
		} else {
			log.debug(`API response`, {
				id,
				method,
				params,
				timing: getTiming(timing)
			});
			prom.resolve(payload);
		}
		cache[id] = undefined;
	}
	else {
		log.error("API Error", {error: "unhandled response", id, method, params} );
	}
};


function request(method, params = null) {
	return new Promise(function(resolve, reject) {
		let id = uuid();
		let timing = {
			apiStart: Date.now(),
			workerStart: 0,
			processing: 0,
			workerEnd: 0,
			apiEnd: 0
		};
		log.debug("API request", {id, method, params});
		cache[id] = { resolve, reject };
		worker.postMessage({id, method, params, timing});
	});
}

module.exports = request;

window.api = request;
