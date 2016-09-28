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

module.exports = {
	failEarly,
	tap
};