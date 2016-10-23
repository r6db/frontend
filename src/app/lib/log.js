const Log = require("@larsbrix/logger");
const { appid } = require("lib/constants");
const uuid = require("lib/uuid");

let log = new Log({
	threshold: 50
}, {
	appid,
	sessionid: uuid()
});

window.log = log;

module.exports = log;
