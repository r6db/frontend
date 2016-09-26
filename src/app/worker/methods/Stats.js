const { baseurl } = require("../../constants");
module.exports.get = () => 
	fetch(`${baseurl}api/stats`)
	.then(res => res.json());