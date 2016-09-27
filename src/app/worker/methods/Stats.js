const { baseurl } = require("../../constants");
const checkStatus = require("../status");
module.exports.get = () =>
	fetch(`${baseurl}api/stats`)
	.then(checkStatus)
	.then(res => res.json());
