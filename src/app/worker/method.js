let methods = {

};

const Method = function(name) {
	let _acquire;
	let _filter;
	let _process;
	let _name = name;
	this.acquire = function(cb) {
		_acquire = cb;
		return this;
	};
	this.filter = function(cb) {
		_filter = cb;
		return this;
	};
	this.process = function(cb) {
		_process = cb;
		return this;
	};
	this.getTask = function() {
		return {
			acquire: _acquire,
			filter: _filter,
			process: _process
		};
	};
};

function register(name) {
	let m = new Method(name);
	methods[name] = m;
	return m;
}

module.exports = {
	methods,
	Method,
	register
};

