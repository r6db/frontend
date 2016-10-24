const m = require("mithril");
const page = require("page");
const Home = require("./Home");
const Search = require("./Search");
const Detail = require("./Detail");
const Loading = require("./misc/Loading");

const debounce = require("lodash/debounce");
const store = require("lib/store");
const { State } = require("lib/constants");

const log = require("lib/log").child(__filename);
const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;

const isInitialState = x => [State.INITIAL].indexOf(store.get("appstate")) !== -1;
const isSearchState = x => [State.SEARCH, State.RESULT].indexOf(store.get("appstate")) !== -1;
const isDetailState = x => [State.DETAIL].indexOf(store.get("appstate")) !== -1;

const optional = (pred, cb) => pred ? cb() : null;

const init = ({state}) => {
	page("/", function(ctx) {
		if(ctx.pathname.slice(0, 10) === "/#/player/") {
			log.trace("got a legacy url");
			let id =  ctx.pathname.slice(11).split(/[\/?#]/)[0];
			page.redirect("/player/" + id);
			return;
		}
		log.debug("router mount <Home />");
		state.component = Home;
		store.set("appstate", State.INITIAL);
		store.set("loading", false);
		store.set(["search", "query"], "");
		store.set(["search", "exact"], false);
		store.set("detail", null);
		ga("set", "page", ctx.path);
		ga("send", "pageview");
	});
	page("/search/:query", function(ctx) {
		log.debug("router mount <Search />");
		let exact = ctx.querystring.indexOf("exact=true") !== -1 ? true : false;
		if(ctx.params.query && ctx.params.query.length >2) {
			log.trace("search context", ctx);
			if(store.get("appstate") !== State.RESULT
			|| store.get(["search", "query"]) !== ctx.params.query
			|| store.get(["search", "exact"]) !== exact) {

				state.component = Search;
				store.set("appstate", State.SEARCH);
				store.set(["search", "query"], "");
				store.set(["search", "query"], ctx.params.query);
				store.set(["search", "exact"], exact);
			} else {
				log.trace("search is identical. skipping request");
			}
			ga("set", "page", ctx.path);
			ga("send", "pageview");
			store.set("detail", null);
		} else {
			page.redirect("/");
		}
	});
	page("/player/:id", function(ctx) {
		log.debug("router mount <Detail />");
		state.component = Detail;
		store.set("appstate", State.DETAIL);
		store.set("detail", ctx.params.id);
		ga("set", "page", ctx.path);
		ga("send", "pageview");
	});
	page("*", function(ctx) {
		if(ctx.path.startsWith("//")) {
			log.trace("trying to redirect path", ctx);
			page.redirect(ctx.path.substr(1));
		} else {
			log.warn("route not found", ctx);
			page.redirect("/");
		}
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
	component: Home,
	oninit: init,
	view: ({ state }) => (
		<div className={"app " + store.get("appstate")}>
			<div className="app-background">
				<img class="clear" src="/assets/skullrain-skull-optim.jpg" />
				<img class="blur" src="/assets/skullrain-skull-blurred.jpg" />
			</div>
			<div className="app-page">
				<state.component store={store} />
			</div>
			{
				store.get("loading") 
				? <Loading />
				: ""
			}
		</div>
	)
};
