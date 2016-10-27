const m = require("mithril");
const page = require("page");;
const api = require("lib/api");
const store = require("lib/store");
const { title, State } = require("lib/constants");

const exitAnim = require("lib/exitAnim");
const log = require("lib/log").child(__filename);
const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;
const Searchbar = require("../misc/Searchbar");


const showPlayer = id => e => page("/player/"+id);

module.exports = {
	stats: m.prop(null),			// db stats
	onbeforeremove: exitAnim,
	oncreate: ({dom}) => {
		dom.querySelector(".search-input input").focus();
	},
	oninit: ({ attrs, state }) => {
		log.trace("<Home /> oninit");
		api("getStats")
			.then(function(res) {
				if(res.usercount && res.namecount) {
					state.stats(res);
				}
			})
			.then(() => m.redraw());
	},
	onremove: ({ state }) => {
		log.trace("<Home /> onremove");
	},
	view: ({ attrs, state }) => (
		<div className="search">
			<h1 className="title is-1 search-title">R6DB</h1>
			<Searchbar search={attrs.store.select("search")} />
			<footer className="search-footer is-center">
				{state.stats() ? (
					<div class="footer-stats">
						<span>{state.stats().usercount}</span> accounts and <span>{state.stats().namecount}</span> aliases indexed
					</div>) : null}
				<a href="mailto:info@r6db.com">info@r6db.com</a>
			</footer>
		</div>
	)
};
