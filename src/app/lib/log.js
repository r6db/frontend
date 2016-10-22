const Log = require("@larsbrix/logger");
const { appid } = require("lib/constants");
const uuid = require("lib/uuid");

let log = new Log(null, {
	appid,
	sessionid: uuid()
});

window.log = log;

module.exports = log;
