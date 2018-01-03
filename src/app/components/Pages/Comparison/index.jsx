import * as m from "mithril";
import * as get from "lodash/get";
import { connect } from "lib/store/connect";
import * as stats from "lib/stats";
import { Operators } from "lib/constants";
import "./comparison.scss";
import OpsChart from "./OpsChart";
import PlayerLabel from "./PlayerLabel";
import Page from "components/misc/Page";
import Modal from "components/misc/Modal";
import Chart from "components/misc/Chart";
import Scale from "components/misc/Scale";
import Stat from "components/misc/Stat";
import Fauxtable from "components/misc/Fauxtable";
import * as Chartist from "chartist";

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
    players
        .filter(p => get(p, "placements.global", null) != null)
        .map(p => ({
            label: p.name,
            value: get(p, "placements.global", 0) + 1,
        }))
        .sort((a, b) => a.value - b.value)
        .concat(players.filter(p => get(p, "placements.global", null) == null));

const getWlAttrs = players =>
    players
        .map(p => ({
            label: p.name,
            value: stats.getWinChanceRaw(p.stats.general) * 100,
        }))
        .sort((a, b) => b.value - a.value);
const getRankedWlAttrs = players =>
    players
        .map(p => ({
            label: p.name,
            value: stats.getWinChanceRaw(p.stats.ranked) * 100,
        }))
        .sort((a, b) => b.value - a.value);

const getKdAttrs = players =>
    players
        .map(p => ({
            label: p.name,
            value: stats.getKillRatio(p.stats.general),
        }))
        .sort((a, b) => b.value - a.value);
const getRankedKdAttrs = players =>
    players
        .map(p => ({
            label: p.name,
            value: stats.getKillRatio(p.stats.ranked),
        }))
        .sort((a, b) => b.value - a.value);
const getKdaAttrs = players =>
    players
        .map(p => ({
            label: p.name,
            value: stats.getKdaRatio(p.stats.general),
        }))
        .sort((a, b) => b.value - a.value);
const getPlaytimeAttrs = players =>
    players
        .map(p => ({
            label: p.name,
            value: get(p, "stats.general.timePlayed", 0),
        }))
        .sort((a, b) => b.value - a.value);

const getKnifeAttrs = players =>
    players
        .map(p => ({
            label: p.name,
            value: get(p, "stats.general.meleeKills", null) | 0,
        }))
        .sort((a, b) => b.value - a.value);

const getOpsAttrs = players =>
    players.map(p => {
        const ops = Object.values(get(p, "stats.operator", {}));
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

const getAccuAttrs = players =>
    players
        .map(p => ({
            label: p.name,
            value: get(p, "stats.general.hitChance", null) | 0,
        }))
        .sort((a, b) => b.value - a.value);
const getHeadshotAttrs = players =>
    players
        .map(p => ({
            label: p.name,
            value: get(p, "stats.general.headshotRatio", null) | 0,
        }))
        .sort((a, b) => b.value - a.value);
const getAbandonAttrs = players =>
    players
        .map(p => ({
            label: p.name,
            value: get(p, "stats.ranked.abandons", null) | 0,
        }))
        .sort((a, b) => a.value - b.value);

const getMmrChartAttrs = players => ({
    title: "MMR",
    type: "Line",
    hideTitle: true,
    data: {
        series: players.map((player, i) => {
            // get the most played region
            const region = ["emea", "ncsa", "apac"]
                .map(x => {
                    const data = get(player, ["ranks", x], {});
                    return {
                        id: x,
                        games: data.wins + data.losses + data.abandons,
                    };
                })
                .sort((a, b) => b.games - a.games)[0].id;

            // and return its data
            return {
                name: player.name,
                data: player.progressions.map(prog => get(prog, ["ranks", region, "mmr"], null)),
                className: `player-${i}`,
            };
        }),
    },
    options: {
        axisX: {
            offset: 0,
            showLabel: false,
        },
        maintainAspectRatio: false,
    },
});

const Component = {
    oninit({ state }) {
        state.showPlayerModal = false;

        state.onAddPlayer = () => (state.showPlayerModal = true);
        state.onModalClose = () => (state.showPlayerModal = false);
    },
    view({ attrs, state }) {
        if (attrs.loading) {
            return null;
        }
        return (
            <Page className="comparison">
                <Page.Head />
                <Page.Content>
                    <div className="container">
                        {state.showPlayerModal ? (
                            <Modal title="Add player" onclose={state.onModalClose}>
                                add some then!
                            </Modal>
                        ) : null}
                        <div className="comparison__playerlist playerlist">
                            <header className="playerlist__header">Comparing</header>
                            <div className="playerlist__players">
                                {attrs.players.map(player => <PlayerLabel {...player} />)}
                                <button className="button button--primary" onclick={state.onAddPlayer}>
                                    add player
                                </button>
                            </div>
                        </div>
                        <div className="comparison__row">
                            <div className="comparison__module comparison__mmr">
                                <div className="comparison__module__header">MMR (most active region)</div>
                                <div className="comparison__module__content">
                                    <Chart {...getMmrChartAttrs(attrs.players)} />
                                </div>
                            </div>
                            <div className="comparison__module comparison__ranking">
                                <div className="comparison__module__header">Ranking</div>
                                <div className="comparison__module__content">
                                    {getRankingAttrs(attrs.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            {player.value}
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="comparison__row">
                            <div className="comparison__module comparison__wlr">
                                <div className="comparison__module__header">Win Percentage (ranked)</div>
                                <div className="comparison__module__content">
                                    {getRankedWlAttrs(attrs.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            <Scale value={player.value} neutral={50}>
                                                %
                                            </Scale>
                                        </Stat>
                                    ))}
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
                                    {getRankedKdAttrs(attrs.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            <Scale value={player.value} neutral={1} />
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                            <div className="comparison__module">
                                <div className="comparison__module__header">KD Ratio (global)</div>
                                <div className="comparison__module__content">
                                    {getKdAttrs(attrs.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            <Scale value={player.value} neutral={1} />
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                            <div className="comparison__module">
                                <div className="comparison__module__header">KDA Ratio (global)</div>
                                <div className="comparison__module__content">
                                    {getKdaAttrs(attrs.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            <Scale value={player.value} neutral={1} />
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="comparison__row">
                            <div className="comparison__module">
                                <div className="comparison__module__header">Accuracy</div>
                                <div className="comparison__module__content">
                                    {getAccuAttrs(attrs.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            {player.value}
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                            <div className="comparison__module">
                                <div className="comparison__module__header">Headshots</div>
                                <div className="comparison__module__content">
                                    {getHeadshotAttrs(attrs.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            <Scale value={player.value} neutral={40}>
                                                %
                                            </Scale>
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="comparison__row">
                            <div className="comparison__module">
                                <div className="comparison__module__header">Playtime</div>
                                <div className="comparison__module__content">
                                    {getPlaytimeAttrs(attrs.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            {stats.formatDuration(player.value)}
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                            <div className="comparison__module">
                                <div className="comparison__module__header">Abandons</div>
                                <div className="comparison__module__content">
                                    {getAbandonAttrs(attrs.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            {player.value}
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                            <div className="comparison__module">
                                <div className="comparison__module__header">Melee kills</div>
                                <div className="comparison__module__content">
                                    {getKnifeAttrs(attrs.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            {player.value}
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="comparison__row">
                            <div className="comparison__module">
                                <Fauxtable className="comparison-table">
                                    <Fauxtable.Head>
                                        <Fauxtable.Row>
                                            <Fauxtable.Heading className="comparison-stat">Stat</Fauxtable.Heading>
                                            {attrs.players.map(x => (
                                                <Fauxtable.Heading className="comparison-value">
                                                    {x.name}
                                                </Fauxtable.Heading>
                                            ))}
                                        </Fauxtable.Row>
                                    </Fauxtable.Head>
                                    <Fauxtable.Body>
                                        {rows.map(row => (
                                            <Fauxtable.Row>
                                                <Fauxtable.Cell className="comparison-stat">{row.label}</Fauxtable.Cell>
                                                {attrs.players.map(x => (
                                                    <Fauxtable.Cell className="comparison-value">
                                                        {row.prop(x)}
                                                    </Fauxtable.Cell>
                                                ))}
                                            </Fauxtable.Row>
                                        ))}
                                    </Fauxtable.Body>
                                </Fauxtable>
                            </div>
                        </div>
                    </div>
                </Page.Content>
            </Page>
        );
    },
};

const mapState = getState => {
    const { players, loading, location: { payload, type } } = getState();
    if (type !== "COMPARISON") {
        return {
            players: [],
            ids: [],
        };
    }
    const ids = payload.ids.split(",");
    return {
        players: ids.map(x => players[x]).filter(x => !!x),
        ids,
        loading,
    };
};

const mapDispatch = (dispatch, getState) => ({
    onRemove: id => () => dispatch({ type: "UNCOMPARE", payload: id }),
});

export default connect(mapState, mapDispatch)(Component);
