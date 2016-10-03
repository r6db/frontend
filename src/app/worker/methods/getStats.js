const { baseurl } = require("../../constants");
const { failEarly, tap } = require("../utils");
const { register } = require("../method");

let stats = null;

const get = function() {
	if(stats) {
		return Promise.resolve(stats);
	} else {
		return fetch(`${baseurl}api/stats`)
			.then(failEarly)
			.then(res => res.json())
			.then(tap(res => stats = res));
	}
};
register("getStats")
	.acquire(get);
