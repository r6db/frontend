import * as m from "mithril";
import * as get from "lodash/get";
import { connect } from "lib/store/connect";
import * as stats from "lib/stats";
import { Operators } from "lib/constants";
import "./comparison.scss";
import TopChart from "./TopChart";
import OpsChart from "./OpsChart";
import PlayerLabel from "./PlayerLabel";

const rows = [
    { label: "platform", prop: x => get(x, "platform", "-") },
    { label: "global rank", prop: x => get(x, "placements.global", "-") },
    { label: "won", prop: x => get(x, "stats.general.won", 0) },
    { label: "lost", prop: x => get(x, "stats.general.lost", 0) },
    {
        label: "wlr",
        prop: x => stats.getWinChance(get(x, "stats.general"), {}),
    },
    { label: "kills", prop: x => get(x, "stats.general.kills", 0) },
    { label: "deaths", prop: x => get(x, "stats.general.deaths", 0) },
    { label: "assists", prop: x => get(x, "stats.general.assists", 0) },
    {
        label: "kdr",
        prop: x => stats.getKillRatio(get(x, "stats.general", {})),
    },
];

const getRankingAttrs = players =>
    players.map(p => ({ label: p.name, value: get(p, "placements.global", null) })).sort((a, b) => a.value - b.value);

const getWlAttrs = players =>
    players
        .map(p => ({
            label: p.name,
            value: stats.getWinChance(p.stats.general),
        }))
        .sort((a, b) => b.value.localeCompare(a.value));
const getKdAttrs = players =>
    players
        .map(p => ({
            label: p.name,
            value: stats.getKillRatio(p.stats.general),
        }))
        .sort((a, b) => b.value.localeCompare(a.value));

const getRankedWlAttrs = players =>
    players
        .map(p => ({
            label: p.name,
            value: stats.getWinChance(p.stats.ranked),
        }))
        .sort((a, b) => b.value.localeCompare(a.value));
const getRankedKdAttrs = players =>
    players
        .map(p => ({
            label: p.name,
            value: stats.getKillRatio(p.stats.ranked),
        }))
        .sort((a, b) => b.value.localeCompare(a.value));

const getKnifeAttrs = players =>
    players
        .map(p => ({
            label: p.name,
            value: get(p, "stats.general.meleeKills", "-"),
        }))
        .sort((a, b) => b.value - a.value);

const getOpsAttrs = players =>
    players.map(p => {
        const ops = Object.values(get(p, "stats.operator", {}));
        console.log("ops", ops);
        return {
            label: p.name,
            value: {
                attackers: ops
                    .filter(x => x.side === "Attack")
                    .sort((a, b) => b.timePlayed - a.timePlayed)
                    .slice(0, 3)
                    .map(x => x.id),
                defenders: ops
                    .filter(x => x.side === "Defense")
                    .sort((a, b) => b.timePlayed - a.timePlayed)
                    .slice(0, 3)
                    .map(x => x.id),
            },
        };
    });

const Component = {
    view({ attrs, state }) {
        return (
            <div className="container comparison">
                <div className="comparison__playerlist playerlist">
                    <header className="playerlist__header">Comparing</header>
                    <div className="playerlist__players">
                        {attrs.players.map(player => <PlayerLabel {...player} />)}
                    </div>
                </div>
                <div className="comparison__row">
                    <div className="comparison__module comparison__mmr">mmr</div>
                    <div className="comparison__module comparison__ranking">
                        <div className="comparison__module__header">Ranking</div>
                        <div className="comparison__module__content">
                            <TopChart data={getRankingAttrs(attrs.players)} />
                        </div>
                    </div>
                </div>
                <div className="comparison__row">
                    <div className="comparison__module comparison__wlr">
                        <div className="comparison__module__header">Win Percentage (ranked)</div>
                        <div className="comparison__module__content">
                            <TopChart data={getRankedWlAttrs(attrs.players)} />
                        </div>
                    </div>
                    <div className="comparison__module comparison__ops">
                        <div className="comparison__module__header">most played Operators</div>
                        <div className="comparison__module__content">
                            <OpsChart data={getOpsAttrs(attrs.players)} />
                        </div>
                    </div>
                </div>
                <div className="comparison__row">
                    <div className="comparison__module comparison__kdr">
                        <div className="comparison__module__header">KD Ratio (ranked)</div>
                        <div className="comparison__module__content">
                            <TopChart data={getRankedKdAttrs(attrs.players)} />
                        </div>
                    </div>
                    <div className="comparison__module comparison__knifes">
                        <div className="comparison__module__header">Melee kills</div>
                        <div className="comparison__module__content">
                            <TopChart data={getKnifeAttrs(attrs.players)} />
                        </div>
                    </div>
                </div>
                <div className="comparison__row">
                    <div className="comparison__module">
                        <div className="comparison__module__header">Win Percentage (global)</div>
                        <div className="comparison__module__content">
                            <TopChart data={getWlAttrs(attrs.players)} />
                        </div>
                    </div>
                    <div className="comparison__module">
                        <div className="comparison__module__header">KD Ratio (global)</div>
                        <div className="comparison__module__content">
                            <TopChart data={getKdAttrs(attrs.players)} />
                        </div>
                    </div>
                </div>
                <div className="fauxtable comparison-table">
                    <div className="fauxtable-head">
                        <div className="fauxtable-row">
                            <div className="fauxtable-cell comparison-stat">Stat</div>
                            {attrs.players.map(x => <div className="fauxtable-cell comparison-value">{x.name}</div>)}
                        </div>
                    </div>
                    <div className="fauxtable-body">
                        {rows.map(row => (
                            <div className="fauxtable-row">
                                <div className="fauxtable-cell comparison-stat">{row.label}</div>
                                {attrs.players.map(x => (
                                    <div className="fauxtable-cell comparison-value">{row.prop(x)}</div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    },
};

const mapState = getState => {
    const s = getState();
    const playerMap = s.players;
    const ids = s.location.payload.ids.split(",");
    window.players = playerMap;
    return {
        players: ids.map(x => playerMap[x]),
        ids,
    };
};

const mapDispatch = (dispatch, getState) => ({
    onRemove: id => () => dispatch({ type: "UNCOMPARE", payload: id }),
});

export default connect(mapState, mapDispatch)(Component);
