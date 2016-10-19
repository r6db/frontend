const m = require("mithril");
const Searchbar = require("../misc/Searchbar");
const Profilepic = require("../misc/Profilepic");
const Loading = require("./Loading");
const Alias = require("./Alias");

const api = require("lib/api");
const exitAnim = require("lib/exitAnim");
const log = require("lib/log").child(__filename);



const playerView = player => (
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
	onbeforeremove: exitAnim,
	onremove: ({ state }) => {
		log.trace("<Detail /> onremove");
		state.player = null;
	},
	oninit: ({ attrs, state }) => {
		log.trace("<Detail /> oninit");
		log.trace("getting player data", attrs.store.get("detail"));
		api("getPlayer", { id: attrs.store.get("detail")})
			.then(function(res) {
				log.trace("got player", res);
				return res;
			})
			.then(state.player)
			.then(() => m.redraw())
			.catch(err => log.error("<Detail /> could not get played",  attrs.store.get("detail")));
	},
	view: ({ attrs, state }) => (
		<div className="detail">
			<Searchbar search={attrs.store.select("search")} />
		{
			state.player()
			? playerView(state.player())
			: <Loading />
		}
		</div>)
};
