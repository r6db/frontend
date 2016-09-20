const m = require("mithril");
const Profilepic = require("../Profilepic");
const round = (number, digits) => ((number * digits)  |0 ) / digits;

const getKd = player => player.stats.kills / player.stats.deaths;
const getWl = player => player.stats.matchesWon / player.stats.matchesLost;

const getAliases = player => {
	let shown = player.aliases.slice(0,2).map(alias => <li>{alias.name}</li>)
	let rest = player.aliases.slice(2).length > 0
		? <li>and {player.aliases.slice(2).length} more</li>
		: null
	return (
		<div className="player-aliases">
			<header>known aliases</header>
			<ul>
				{shown}
				{rest}
			</ul>
		</div>);
};
const getStats = player => (
	player.stats
	? (<div className="player-stats">
		KD: {round(getKd(player), 2)} | WL: {round(getWl(player), 2)}
	</div>)
	: null
);

module.exports = {
	view: ({attrs}) => (
		<div className="playercard">
			<a href="" className="card-image">
				<Profilepic id={attrs.player.id}/>
			</a>
			<div className="card-content">
				<div className="player-identification">
					<a href=""className="player-name">{attrs.player.name}</a>
					<span className="player-id">{attrs.player.id}</span>
				</div>
				{getAliases(attrs.player)}
				<a href={`https://game-rainbow6.ubi.com/en-gb/uplay/player-statistics/${attrs.player.id}/multiplayer`} className="player-uplaylink">
				› view on uplay
				</a>
			</div>
		</div>
	)

}
