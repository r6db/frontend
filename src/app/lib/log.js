let entries = [];

// ---- Levels
let TRACE = 10;
let DEBUG = 20;
let INFO = 30;
let WARN = 40;
let ERROR = 50;

let logThreshold = DEBUG;

function levelString(level) {
	switch (level) {
	case TRACE:
		return "TRACE";
	case DEBUG:
		return "DEBUG";
	case INFO:
		return "INFO";
	case WARN:
		return "WARN";
	case ERROR:
		return "ERROR";
	default:
		return "";
	}
}

function getColor(level) {
	switch (level) {
	case TRACE:
		return "color: #ee8624";
	case DEBUG:
		return "color: #58C294";
	case INFO:
		return "color: #7BAED6";
	case WARN:
		return "color: #ffc83f";
	case ERROR:
		return "color: #fa5e5b";
	case "time":
		return "";
	case "text":
		return "color: #888";
	default:
		return "";
	}
}

function argsToArray(args) {
	return [].slice.call(args);
}
function repeat(char, amnt) {
	let ret = "";
	for (let i = 0; i < amnt; i++) {
		ret += char;
	}
	return ret;
}
function pad(amnt, num) {
	return (repeat("0", amnt) + num).slice(-2);
}

function logToServer(entry) {

	// we dont have a logserver (yet?).
}

function Log(_config) {
	let baseConfig = _config || {
	name: "log"
	};
	let getConfig = function(level) {
		return Object.assign({}, baseConfig, {
			time: new Date(),
			name: baseConfig.name,
			level: level
		});
	};

	function logWithLevel(level, msgs) {
		let config = getConfig(level);
		let entry = Object.assign({}, config);
		entry.data = msgs.slice(1);

		if (msgs[0] instanceof Error) {
			entry.msg = msgs[0].message;
			entry.data = [msgs[0].stack].concat(entry.data);
		}
		else {
			entry.msg = msgs[0];
		}

		entries.push(entry);
		if (entry.level >= WARN) {
					logToServer(entry);
		}

		if (entry.level >= logThreshold) {
			let timeString = "[" + entry.time.toLocaleTimeString() + "]";
			let logFormat = `%c%s%c %s %c%s \n%c%s ${entry.data !== undefined?"%o":""}`;
			let logCommand = [
				logFormat,
				getColor("time"),
				timeString,
				getColor(level),
				levelString(level),
				getColor("text"),
				(entry.component || ""),
				getColor(),
				entry.msg,
				entry.data
			];
			console.log.apply(console, logCommand);
		}
	};

	this.trace = function(...args) {
		logWithLevel(TRACE, args);
	};
	this.debug = function(...args) {
		logWithLevel(DEBUG, args);
	};
	this.info = function(...args) {
		logWithLevel(INFO, args);
	};
	this.warn = function(...args) {
		logWithLevel(WARN, args);
	};
	this.error = function(...args) {
		logWithLevel(ERROR, args);
	};


	this.child = function child(name) {
		return new Log(Object.assign({}, baseConfig, {component: name}));
	};
	this.entries = function() {
		return entries;
	};
	this.level = function(level){
		if (typeof level === "string") {
			switch (level) {
			case "TRACE":
				return logThreshold = TRACE;
			case "DEBUG":
				return logThreshold = DEBUG;
			case "INFO":
				return logThreshold = INFO;
			case "WARN":
				return logThreshold = WARN;
			case "ERROR":
				return logThreshold = ERROR;
			default:
				return -1;
			}
		}
		else {
			logThreshold = parseInt(level) || 0;
		}
	};
};



const log = new Log({
	name: "gitgudscrub"
});

if (process.env.NODE_ENV !== "production") {
	log.level(0);
}


window.log = log;

module.exports = log;
