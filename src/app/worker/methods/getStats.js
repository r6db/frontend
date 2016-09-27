const { baseurl } = require("../../constants");
const { failEarly } = require("../utils");
const { register } = require("../method");


const get = () => fetch(`${baseurl}api/stats`)
	.then(failEarly)
	.then(res => res.json());

register("getStats")
	.acquire(get);