const m = require("mithril");
const Searchbar = require("./Searchbar");
const Profilepic = require("../misc/Profilepic");
const Loading = require("./Loading");
const Alias = require("./Alias");

const api = require("lib/api");
const exitAnim = require("lib/exitAnim");
const log = require("lib/log").child(__filename);

const DetailStates = {
	ALIASES: "aliases",
	STATS: "stats"
};

const playerView = (player) => (
	<div className="detail-player">
		<div className="detail-header">
			<div className="detail-headerimage">
				<Profilepic id={player.id} delay={0} />
			</div>
			<div className="detail-headertext">
				<div className="detail-name">{player.name}</div>
				<div className="detail-id">{player.id}</div>
			</div>
		</div>
		<div className="detail-content">
			<div className="detail-info">
				<div className="detail-time">

				</div>
				<div className="detail-aliases">
					{player.aliases.map(x => <Alias alias={x} />)}
				</div>
			</div>
			<div className="detail-stats">
			</div>
		</div>
	</div>
);

module.exports = {
	player: m.prop(null),
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
				.then(state.player)
				.then(() => m.redraw());
		} else {
			log.warn("no id given to <Detail />");
		}
	},
	view: vnode => (
		<div className="detail">
			<Searchbar />
		{
			vnode.state.player()
			? playerView(vnode.state.player())
			: <Loading />
		}
		</div>)
};
