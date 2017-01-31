import jsdom from "jsdom";

const DEFAULT_HTML = "<html><body></body></html>";

global.document = jsdom.jsdom(DEFAULT_HTML);

global.window = document.defaultView;
global.navigator = window.navigator;