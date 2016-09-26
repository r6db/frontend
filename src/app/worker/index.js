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
	let { id, method, params } = e.data;
	if(methods[method]) {
		methods[method](params)
		.then(function(payload) {
			self.postMessage({id, method, payload})
		})
		.catch(function(error) {
			if(error instanceof Error) {
				error = {
					message: error.message,
					stack: error.stack
				}
			}
			self.postMessage({id, method, error});
		})
	}
}