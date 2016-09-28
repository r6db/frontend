const m = require("mithril");
const page = require("page");
const Search = require("./Search");
const Detail = require("./Detail");
const { states, appstate } = require("lib/appstate");
const { getQuerystring } = require("lib/querystring");
const log = require("lib/log").child(__filename);
const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;

const isDetailState = appstate.run(x => [states.DETAIL].indexOf(x) !== -1);
const isSearchState = appstate.run(x => [states.INITIAL, states.SEARCH, states.RESULT].indexOf(x) !== -1);

const init = ({state}) => {
	appstate.run(state => log.trace("new appstate", state));
	let query = getQuerystring();
	// accept legacy urls
	if(window.location.href.indexOf("/#/player/") !== -1) {
		log.trace("router found legacy url");
		let id = window.location.href
			.split("/#/player/")[1]
			.split("?")[0]
			.replace(/\//g, "");
		query.query = id;
	}
	page("/", function(ctx) {
		log.trace("router redirecing / to /search");
		page.redirect("/search");
	});
	page("/search", function(ctx) {
		log.trace("router switch to search");
		ctx.query = getQuerystring(ctx.querystring);
		if(ctx.query.query && ctx.query.query.length >2) {
			log.trace("router usable query");
			appstate(states.SEARCH);
		} else {
			appstate(states.INITIAL);
		}
		state.context(ctx);
		m.redraw();
	}),
	page("/player/:id", function(ctx) {
		log.trace("router switch to detail");
		ctx.query = getQuerystring(ctx.querystring);
		appstate(states.DETAIL);
		state.context(ctx);
		m.redraw();
	});
	page("*", function(ctx) {
		if(ctx.path.slice(0, 10) === "/#/player/") {
			let id =  ctx.path.slice(11).split(/[\/?#]/)[0];
			page.redirect("/player/" + id);
		}
		log.warn("route not found", ctx);
	});
	page.start({hashbang: true});
};


module.exports = {
	status: appstate,
	detail: m.prop(null),
	oninit: init,
	context: m.prop({}),
	view: ({ state }) => (
		<div className={"app " + appstate()}>
			<div className="app-background">
				<img src="/assets/skullrain-skull.jpg" />
			</div>
			<div className="app-pages">
				<div className="app-page">
				{
					isSearchState()
						? <Search context={state.context}/>
						: ""
				}
				</div>
				<div className="app-page">
				{
					isDetailState()
						? <Detail context={state.context} onBackdropClick={state.hideFocus}/>
						: ""
				}
				</div>
			</div>
		</div>
	)
};
