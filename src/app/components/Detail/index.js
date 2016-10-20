const m = require("mithril");
const moment = require("moment");

const Searchbar = require("../misc/Searchbar");
const Profilepic = require("../misc/Profilepic");
const Alias = require("./Alias");

const { Ranks } = require("lib/constants");
const api = require("lib/api");
const exitAnim = require("lib/exitAnim");
const log = require("lib/log").child(__filename);

const optional = (pred, cb) => pred ? cb() : null;

const secToHours = sec => moment.duration(sec || 0, "seconds")
	.asHours()
	.toFixed(2) + " hours";

const getPlaytime = player => (
	<div className="detail-timeplayed module">
		<header className="module-header">Time played</header>
		<div className="module-row">
			<div className="module-label">Casual</div>
			<div className="module-value">{secToHours(player.lastPlayed.casual)}</div>
		</div>
		<div className="module-row">
			<div className="module-label">Ranked</div>
			<div className="module-value">{secToHours(player.lastPlayed.ranked)}</div>
		</div>
		<div className="module-row">
			<div className="module-label">Total</div>
			<div className="module-value">{secToHours(player.lastPlayed.casual + player.lastPlayed.ranked)}</div>
		</div>
	</div>
);

const getTimestamps = player => (
	<div className="detail-timestamps module">
		<header className="module-header">Timestamps</header>
		<div className="module-row">
			<div className="module-label">First added</div>
			<div className="module-value">{moment(player.created_at).fromNow()}</div>
		</div>
		{
			player.lastPlayed
			? (<div className="module-row">
				<div className="module-label">Last played</div>
				<div className="module-value">{moment(player.lastPlayed.last_played).fromNow()}</div>
			</div>)
			: ""
		}
		<div className="module-row">
			<div className="module-label">Last updated</div>
			<div className="module-value">{moment(player.aliases[0].updated_at).fromNow()}</div>
		</div>
	</div>
);


const getGeneralStats = player => (
	<div className="detail-generaltats module">
		<header className="module-header">General Stats</header>
		<div className="module-row">
			<div className="module-label">Wins</div>
			<div className="module-value">{player.stats.general.won}</div>
		</div>
		<div className="module-row">
			<div className="module-label">Losses</div>
			<div className="module-value">{player.stats.general.lost}</div>
		</div>
		<div className="module-row">
			<div className="module-label">Win rate</div>
			<div className="module-value">{
				((player.stats.general.won/
					(player.stats.general.won+player.stats.general.lost))*100
				).toFixed(2)
			}%</div>
		</div>
		<div className="module-row">
			<div className="module-label">Kills</div>
			<div className="module-value">{player.stats.general.kills}</div>
		</div>
		<div className="module-row">
			<div className="module-label">Deaths</div>
			<div className="module-value">{player.stats.general.deaths}</div>
		</div>
		<div className="module-row">
			<div className="module-label">K/D ratio</div>
			<div className="module-value">{
				(player.stats.general.kills/player.stats.general.deaths).toFixed(2)
			}</div>
		</div>
	</div>
);

const getRankedStats = player => {
	let season = player.rank.apac;
	if(player.rank.emea.wins + player.rank.emea.losses > season.wins + season.losses) {
		season = player.rank.emea;
	}
	if(player.rank.ncsa.wins + player.rank.ncsa.losses > season.wins + season.losses) {
		season = player.rank.ncsa;
	}
	return (
		<div className="detail-rankedstats module">
			<header className="module-header">Ranked Stats</header>
			<div className="module-row">
				<div className="module-label">Wins</div>
				<div className="module-value">{season.wins}</div>
			</div>
			<div className="module-row">
				<div className="module-label">Losses</div>
				<div className="module-value">{season.losses}</div>
			</div>
			<div className="module-row">
				<div className="module-label">Win rate</div>
				<div className="module-value">{
					((season.wins/
						(season.wins+season.losses))*100
					).toFixed(2)
				}%</div>
			</div>
			<div className="module-row">
				<div className="module-label">MMR</div>
				<div className="module-value">{season.mmr.toFixed(2)}</div>
			</div>
			<div className="module-row">
				<div className="module-label">Rank</div>
				<div className={`module-value rank-${season.rank - 1}`}>{Ranks[season.rank - 1]}</div>
			</div>
			<div className="module-row">
				<div className="module-label">Skill</div>
				<div className="module-value">{season.skill_mean.toFixed(2)} ± {season.skill_stdev.toFixed(2)}</div>
			</div>
		</div>
	);
};

const playerView = player => (
	<div className="detail-player">
		<div className="detail-header">
			<div className="detail-headerimage">
				<Profilepic id={player.id} delay={0} />
			</div>
			<div className="detail-headertext">
				<div className="detail-name">{player.aliases[0].name}</div>
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
				{optional(player.stats, () => getGeneralStats(player))}
				{optional(player.rank, () => getRankedStats(player))}
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
		attrs.store.set("loading", true);
		api("getPlayer", { id: attrs.store.get("detail")})
			.then(function(res) {
				log.trace("got player", res);
				return res;
			})
			.then(state.player)
			.then(function() {
				requestAnimationFrame(m.redraw);
				attrs.store.set("loading", false);
			})
			.catch(err => {
				log.error(err);
				attrs.store.set("loading", false);
			});
	},
	view: ({ attrs, state }) => (
		<div className="detail">
			<Searchbar search={attrs.store.select("search")} />
		{
			attrs.store.get("loading") || !state.player()
			? ""
			: playerView(state.player())
		}
		</div>)
};
