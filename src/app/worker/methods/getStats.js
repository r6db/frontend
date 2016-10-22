const { v2Api } = require("lib/constants");
const { failEarly, tap, getHeaders } = require("../utils");
const { register } = require("../method");

let stats = null;

const get = function() {
	if(stats) {
		return Promise.resolve(stats);
	} else {
		return fetch(`${v2Api}/stats`, { headers: getHeaders()})
			.then(failEarly)
			.then(res => res.json())
			.then(tap(res => stats = res));
	}
};
register("getStats")
	.acquire(get);
