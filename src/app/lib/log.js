import Log from "@larsbrix/logger";
import { appid } from "lib/constants";
import uuid from "lib/uuid";

const log = new Log({
    threshold: 50
}, {
    appid,
    sessionid: uuid()
});


export default log;
