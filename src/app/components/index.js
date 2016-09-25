const m = require("mithril");
const page = require("page");
const Search = require("./Search");
const Detail = require("./Detail");
const { getQuerystring } = require("lib/querystring");
const { getStats } = require("lib/stats");
const log = require("lib/log").child(__filename);
const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;

const AppState = Object.freeze({
	SEARCH: "is-search",
	DETAIL: "is-detail"
});


const init = ({state}) => {
	let query = getQuerystring();
	// accept legacy urls
	if(window.location.href.indexOf("/#/player/") !== -1) {
		let id = window.location.href
			.split("/#/player/")[1]
			.split("?")[0]
			.replace(/\//g,"");
		query.query = id;
	}
	page("/", function(ctx){
		page.redirect("/search");
	})
	page("/search", function(ctx){
		log.trace("switching to search");
		ctx.query = getQuerystring(ctx.querystring);
		state.status(AppState.SEARCH);
		state.context(ctx);
		m.redraw();
	}),
	page("/player/:id", function(ctx){
		log.trace("switching to detail");
		ctx.query = getQuerystring(ctx.querystring);
		state.status(AppState.DETAIL);
		state.context(ctx);
		m.redraw();
	})
	page("*", function(ctx){
		if(ctx.path.slice(0,10) === "/#/player/"){
			let id =  ctx.path.slice(11).split(/[\/?#]/)[0];
			page.redirect("/player/" + id);
		}
		log.trace("route not found");
	})
	page.start({hashbang: true});
}


module.exports = {
	status: m.prop(""),
	detail: m.prop(null),
	oninit: init,
	context: m.prop({}),
	view: ({ state }) =>(
		<div className={"app " + state.status()}>
			<div className="app-page">
			{
				state.status() === AppState.SEARCH
					? <Search context={state.context}/>
					: ""
			}
			</div>
			<div className="app-page">
			{
				state.status() === AppState.DETAIL
					? <Detail context={state.context} onBackdropClick={state.hideFocus}/>
					: ""
			}
			</div>
		</div>
	)
}
