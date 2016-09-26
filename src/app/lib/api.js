const worker = new Worker("/js/worker.js");
const log = require("lib/log").child(__filename);

const uuid = function() {
	let str = Math.random().toString(16).split(".")[1];
	return str.substr(0,8);
}

let cache = {};
const TIMEOUT = 10000;

worker.onmessage = function receive(e) {
	let {id, method, payload, error} = e.data;
	if(cache[id]) {
		let prom = cache[id];
		if(error) {
			prom.reject(error);
		} else {
			prom.resolve(payload);
		}
		cache[id] = undefined;
	}
	else {
		log.warn("orphaned worker message", {id, method} );
	}
}


function request(method, params = null) {
	return new Promise(function(resolve, reject) {
		let id = uuid();
		cache[id] = {
			resolve: resolve,
			reject: reject
		};
		worker.postMessage({id, method, params});
	});
}

module.exports = request;

window.api = request;