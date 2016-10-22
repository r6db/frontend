const m = require("mithril");
const page = require("page");
const Home = require("./Home");
const Search = require("./Search");
const Detail = require("./Detail");
const Loading = require("./misc/Loading");

const debounce = require("lodash/debounce");
const store = require("lib/store");
const { State } = require("lib/constants");

const { getQuerystring } = require("lib/querystring");
const log = require("lib/log").child(__filename);
const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;

const isInitialState = x => [State.INITIAL].indexOf(store.get("appstate")) !== -1;
const isSearchState = x => [State.SEARCH, State.RESULT].indexOf(store.get("appstate")) !== -1;
const isDetailState = x => [State.DETAIL].indexOf(store.get("appstate")) !== -1;

const optional = (pred, cb) => pred ? cb() : null;

const init = ({state}) => {
	let query = getQuerystring();
	// accept legacy urls
	if(window.location.href.indexOf("/#/player/") !== -1) {
		log.debug("router found legacy url");
		let id = window.location.href
			.split("/#/player/")[1]
			.split("?")[0]
			.replace(/\//g, "");
		query.query = id;
	}
	page("/", function(ctx) {
		log.debug("router mount <Home />");
		store.set("appstate", State.INITIAL);
		store.set(["search", "query"], "");
		store.set(["search", "exact"], false);
		store.set("detail", null);
		m.redraw();
	});
	page("/search/:query", function(ctx) {
		log.debug("router mount <Search />");
		let query = getQuerystring(ctx.querystring);
		let exact = query.exact === "true" ? true : false;
		if(ctx.params.query && ctx.params.query.length >2) {
			log.trace("search context", ctx);
			if(store.get("appstate") !== State.RESULT
			|| store.get(["search", "query"]) !== ctx.params.query
			|| store.get(["search", "exact"]) !== exact) {
				store.set("appstate", State.SEARCH);
				store.set(["search", "query"], "");
				store.set(["search", "query"], ctx.params.query);
				store.set(["search", "exact"], exact);
			} else {
				log.trace("search is identical. skipping request");
				debugger;
			}
			store.set("detail", null);
		} else {
			page.redirect("/");
		}
		m.redraw();
	});
	page("/player/:id", function(ctx) {
		log.debug("router mount <Detail />");
		ctx.query = getQuerystring(ctx.querystring);
		store.set("appstate", State.DETAIL);
		store.set("detail", ctx.params.id);
		m.redraw();
	});
	page("*", function(ctx) {
		if(ctx.path.slice(0, 10) === "/#/player/") {
			let id =  ctx.path.slice(11).split(/[\/?#]/)[0];
			page.redirect("/player/" + id);
		} else if(ctx.path.startsWith("//")) {
			log.trace("trying to redirect path", ctx);
			page.redirect(ctx.path.substr(1));
		}
		log.warn("route not found", ctx);
	});
	page.start();

	/**
	 * we listen to the hashchange manually,
	 * because page doesn't trigger on querystring changed
	 * and we need to have the correct appstate
	 */
	let onHashChange = e => {
		log.trace("hash has changed. running page");
		page(window.location.hash);
	};
	// window.addEventListener("hashchange", onHashChange);
	store.on("update", debounce(function() {
		log.trace("state changed, redrawing");
		m.redraw();
	}, 200));
};


module.exports = {
	status: store.get("appstate"),
	detail: m.prop(null),
	oninit: init,
	context: m.prop({}),
	view: ({ state }) => (
		<div className={"app " + store.get("appstate")}>
			<div className="app-background">
				<img class="clear" src="/assets/skullrain-skull.jpg" />
				<img class="blur" src="/assets/skullrain-skull-blurred.jpg" />
			</div>
			<div className="app-pages">
				<div className="app-page">
				{optional(isInitialState(), () => <Home store={store}/>)}
				{optional(isSearchState(), () => <Search store={store}/>)}
				</div>
				<div className="app-page">
					<Detail store={store} onBackdropClick={state.hideFocus}/>
				</div>
			</div>
			{
				store.get("loading") 
				? <Loading />
				: ""
			}
		</div>
	)
};
