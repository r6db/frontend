const { appid } = require("lib/constants");

const failEarly = function failEarly(res) {
	if(!res.ok) {
		throw res.json();
	} else {
		return res;
	}
};

const tap = cb => data => {
	cb(data);
	return data;
};


const getHeaders = headers => {
	let h = new Headers();
	
	h.append("X-App-Id", appid);

	if(headers) {
		Object.keys(headers)
			.map(key => {
				h.append(key, headers[key]);
			});
	}

	return h;
};

module.exports = {
	failEarly,
	tap,
	getHeaders
};