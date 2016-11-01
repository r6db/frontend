const m = require("mithril");

const NotFound = require("./NotFound");
const Profilepic = require("../../misc/Profilepic");
const Alias = require("./Alias");
const Placeholder = require("../Placeholder");
const Playtime = require("./modules/Playtime");
const Timedata = require("./modules/Timedata");
const GeneralStats = require("./modules/GeneralStats");
const RankedStats = require("./modules/RankedStats");

const moment = require("moment");
const { State } = require("lib/constants");
const setMeta = require("lib/meta");
const api = require("lib/api");
const exitAnim = require("lib/exitAnim");
const log = require("lib/log").child(__filename);

const optional = (pred, cb) => pred ? cb() : null;

module.exports = {
	player: m.prop(null),
	onbeforeremove: exitAnim,
	onremove: ({ state }) => {
		log.trace("<Player /> onremove");
		state.player(null);
	},
	oninit: ({ attrs, state }) => {
		log.trace("<Player /> oninit");
		log.trace("getting player data", attrs.store.get("detail"));
		api("getPlayer", { id: attrs.store.get("detail")})
			.then(function(res) {
				log.trace("got player", res);
				return res;
			})
			.then(state.player)
			.then(function() {
				setMeta(State.DETAIL, state.player().aliases[0].name);
				requestAnimationFrame(m.redraw);
				attrs.store.set("loading", false);
			})
			.catch(err => {
				log.error(err);
				attrs.store.set("loading", false);
			});
	},
	view: ({ attrs, state }) => attrs.store.get("loading")
		? <Placeholder />
		: state.player()
			? (<div className="detail-player">
					<div className="detail-header">
						<div className="detail-headerimage">
							<Profilepic id={state.player().id} delay={0} />
						</div>
						<div className="detail-headertext">
							<div className="detail-name">{state.player().aliases[0].name}</div>
							<a href={`https://game-rainbow6.ubi.com/en-gb/uplay/player-statistics/${state.player().id}/multiplayer`}
								className="detail-id"
								title="show on uplay">
								{state.player().id}
							</a>
						</div>
					</div>
					<div className="detail-content">
						<div className="detail-info">
							<div className="detail-aliases">
								{state.player().aliases.map(x => <Alias alias={x} />)}
							</div>
						</div>
						<div className="detail-stats">
							<Timedata player={state.player()} />
							<Playtime player={state.player()} />
							<GeneralStats player={state.player()} />
							<RankedStats player={state.player()} />
						</div>
					</div>
				</div>)
			: <NotFound />
};
