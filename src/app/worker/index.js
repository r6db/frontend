require("whatwg-fetch");
const Stats = require("./methods/Stats");
const Player = require("./methods/Player");
let methods = {
	echo: e => Promise.resolve(e),
	getStats: Stats.get,
	getPlayer: Player.get,
	findPlayer: Player.find
}

self.onmessage = function workerReceive(e) {
	let { id, method, params, timing } = e.data;
	if(methods[method]) {
		timing.workerStart = Date.now()
		methods[method](params)
		.then(function(payload) {
			timing.workerEnd = Date.now();
			self.postMessage({id, method, payload, timing, params})
		})
		.catch(function(error) {
			if(error.then) {
				return error.then(function(res) {
					let error = res.error || res;
					timing.workerEnd = Date.now();
					self.postMessage({id, method, error, timing, params});
				})
			} else {
				if(error instanceof Error) {
					error = {
						message: error.message,
						stack: error.stack
					}
				}
				timing.workerEnd = Date.now();
				self.postMessage({id, method, error, timing, params});
			}
		})
	}
}
