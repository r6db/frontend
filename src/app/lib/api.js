const worker = new Worker("/js/worker.js");
const log = require("lib/log").child(__filename);

/**
 * pseudo uuid v4
 * it uses a fixed y in the
 * xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 * pattern
 */
function uuid() {
	const r = cnt => Math.random()
		.toString(16)
		.split(".")[1]
		.substring(0, cnt || 4);
	return `${r(8)}-${r(4)}-4${r(3)}-a${r(3)}-${r(12)}`;
};

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
				timing: {
					duration: timing.apiEnd - timing.apiStart,
					xhr: timing.workerEnd - timing.workerStart,
					transport: timing.apiEnd - timing.workerEnd
				}
			});
			prom.reject(error);
		} else {
			log.debug(`API response`, {
				id,
				method,
				params,
				timing: {
					duration: timing.apiEnd - timing.apiStart,
					xhr: timing.workerEnd - timing.workerStart,
					transport: timing.apiEnd - timing.workerEnd
				}
			});
			prom.resolve(payload);
		}
		cache[id] = undefined;
	}
	else {
		log.error("API Error", {error: "unhandled response", id, method, params} );
	}
}


function request(method, params = null) {
	return new Promise(function(resolve, reject) {
		let id = uuid();
		let timing = {
			apiStart:  Date.now(),
			workerStart: 0,
			workerEnd: 0,
			apiEnd: 0
		}
		cache[id] = { resolve, reject, timeout };
		worker.postMessage({id, method, params, timing});
	});
}

module.exports = request;

window.api = request;
