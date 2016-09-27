const worker = new Worker("/js/worker.js");
const log = require("lib/log").child(__filename);

/**
 * pseudo uuid v4
 * has a fixed format of
 * xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 * pattern
 * where x  in [0-9a-z]
 * and y  in [89ab]
 */
function uuid() {
	// make a series of x digits
	const x = cnt => Math.random()
		.toString(16)
		.split(".")[1]
		.substring(0, cnt || 4);
	// make a single y digit
	const y = () => "89ab"[(Math.random()*10 | 0 )%4];

	return `${x(8)}-${x(4)}-4${x(3)}-${y()}${x(3)}-${x(12)}`;
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
		cache[id] = { resolve, reject };
		worker.postMessage({id, method, params, timing});
	});
}

module.exports = request;

window.api = request;
