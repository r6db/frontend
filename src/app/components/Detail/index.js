const m = require("mithril");
const Searchbar = require("./Searchbar");
const Loading = require("./Loading");
const Alias = require("./Alias");

const api = require("lib/api");
const exitAnim = require("lib/exitAnim");
const log = require("lib/log").child(__filename);

const DetailStates = {
	ALIASES: "aliases",
	STATS: "stats"
};

const playerView = ({state}) => (
	<div className="detail-player">
		<div className="detail-name">{state.player.name}</div>
		<div className="detail-tabs">
			<div className="tab" onclick={state.setStatus(DetailStates.ALIASES)}>Aliases</div>
			<div className="tab" onclick={state.setStatus(DetailStates.STATS)}>Stats</div>
		</div>
		<div className="detail-tabcontent">
			<div className="detail-aliases">
				{state.player.aliases.map(x => <Alias alias={x} />)}
			</div>
			<div className="detail-stats">
			</div>
		</div>
	</div>
);

module.exports = {
	player: null,
	state: m.prop(DetailStates.ALIASES),
	onbeforeremove: exitAnim,
	onremove: ({ state }) => {
		log.trace("<Detail /> onremove");
		state.player = null;
	},
	oninit: ({ attrs, state }) => {
		state.setStatus = status => e => state.state(status);
		log.trace("<Detail /> oninit");
		let ctx = attrs.context();
		if(ctx.params && ctx.params.id) {
			log.trace("getting player data", ctx.params.id);
			api("getPlayer", { id: ctx.params.id})
				.then(function(res) {
					log.trace("got player", res);
					return res;
				})
				.then(res => state.player = res)
				.then(() => m.redraw());
		} else {
			log.warn("no id given to <Detail />");
		}
	},
	view: vnode => (
		<div className="detail">
			<Searchbar />
		{
			vnode.state.player
			? playerView(vnode)
			: <Loading />
		}
		</div>)
};
