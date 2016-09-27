require("whatwg-fetch");
const { tap } = require("./utils");
const { methods } = require("./method");

const maybeMap = (fn, args) => payload => 
	(typeof fn === "function")
		? fn(payload, args)
		: payload

// load methods
let requireAll = r => r.keys().map(r);
requireAll(require.context('./methods'));
self.onmessage = function workerReceive(e) {
	let { id, method, params, timing } = e.data;
	if(methods[method]) {
		timing.workerStart = Date.now();

		// get method
		let task = methods[method].getTask();
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
		.then(function(payload) {
			// respond
			console.log("payload", payload);
			self.postMessage({id, method, payload, timing, params})
		})
		.catch(function(error) {
			if(error.then) {
				// error is a promise?
				return error.then(function(res) {
					let error = res.error || res;
					timing.workerEnd = Date.now();
					self.postMessage({id, method, error, timing, params});
				})
			} else {
				// map to serializable form
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
	} else {
		self.postMessage({id, method, timing, params, error: "method not found"})
	}
}


