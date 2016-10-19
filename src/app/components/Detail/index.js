const m = require("mithril");
const moment = require("moment");

const Searchbar = require("../misc/Searchbar");
const Profilepic = require("../misc/Profilepic");
const Loading = require("./Loading");
const Alias = require("./Alias");

const api = require("lib/api");
const exitAnim = require("lib/exitAnim");
const log = require("lib/log").child(__filename);

const optional = (pred, cb) => pred ? cb() : null;

const secToHours = sec => moment.duration(sec || 0, "seconds")
	.asHours()
	.toFixed(2) + " hours";

const getPlaytime = player => (
	<div className="detail-timeplayed module">
		<header className="module-header">Time played (in actual match)</header>
		<div className="module-row">
			<div className="module-label">casual</div>
			<div className="module-value">{secToHours(player.lastPlayed.casual)}</div>
		</div>
		<div className="module-row">
			<div className="module-label">ranked</div>
			<div className="module-value">{secToHours(player.lastPlayed.ranked)}</div>
		</div>
		<div className="module-row">
			<div className="module-label">total</div>
			<div className="module-value">{secToHours(player.lastPlayed.casual + player.lastPlayed.ranked)}</div>
		</div>
	</div>
);

const getTimestamps = player => (
	<div className="detail-timestamps module">
		<header className="module-header">Timestamps</header>
		<div className="module-row">
			<div className="module-label">first added</div>
			<div className="module-value">{moment(player.created_at).fromNow()}</div>
		</div>
		{
			player.lastPlayed
			? (<div className="module-row">
				<div className="module-label">last played</div>
				<div className="module-value">{moment(player.lastPlayed.last_played).fromNow()}</div>
			</div>)
			: ""
		}
		<div className="module-row">
			<div className="module-label">last updated</div>
			<div className="module-value">{moment(player.aliases[0].updated_at).fromNow()}</div>
		</div>
	</div>
);


const getStats = player => (
	<div className="detail-basestats module">
		<header className="module-header">Stats</header>
		<div className="module-row">
			<div className="module-label">wins</div>
			<div className="module-value">{player.stats.matchesWon}</div>
		</div>
		<div className="module-row">
			<div className="module-label">losses</div>
			<div className="module-value">{player.stats.matchesLost}</div>
		</div>
		<div className="module-row">
			<div className="module-label">win ratio</div>
			<div className="module-value">{
				((player.stats.matchesWon/
					(player.stats.matchesWon+player.stats.matchesLost))*100
				).toFixed(2)
			}%</div>
		</div>
		<div className="module-row">
			<div className="module-label">kills</div>
			<div className="module-value">{player.stats.kills}</div>
		</div>
		<div className="module-row">
			<div className="module-label">deaths</div>
			<div className="module-value">{player.stats.deaths}</div>
		</div>
		<div className="module-row">
			<div className="module-label">k/d ratio</div>
			<div className="module-value">{
				(player.stats.kills/player.stats.deaths).toFixed(2)
			}</div>
		</div>
	</div>
);

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
				<div className="detail-aliases">
					{player.aliases.map(x => <Alias alias={x} />)}
				</div>
			</div>
			<div className="detail-stats">
				{getTimestamps(player)}
				{optional(player.lastPlayed, () => getPlaytime(player))}
				{optional(player.stats, () => getStats(player))}
			</div>
		</div>
	</div>
);

module.exports = {
	player: m.prop(null),
	onbeforeremove: exitAnim,
	onremove: ({ state }) => {
		log.trace("<Detail /> onremove");
		state.player(null);
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
			.then(function() {
				requestAnimationFrame(m.redraw);
			})
			.catch(err => log.error("<Detail /> could not get player", {
				id: attrs.store.get("detail"), 
				err
			}));
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
