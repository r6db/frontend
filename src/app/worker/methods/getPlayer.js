const { baseurl } = require("../../constants");
const { failEarly } = require("../utils");
const { register } = require("../method");


const find = ({ id }) => fetch(`${baseurl}api/id/${id}`)
	.then(failEarly)
	.then(res => res.json());

register("getPlayer")
	.acquire(find);