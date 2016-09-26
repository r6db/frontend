const { baseurl } = require("../../constants");
module.exports.get = id => 
	fetch(`${baseurl}api/player/${id}`)
	.then(res => res.json());

module.exports.find = ({ name, exact }) => 
	fetch(`${baseurl}api/player/${name}?${exact ? "exact=true" : ""}`)
	.then(res => res.json());