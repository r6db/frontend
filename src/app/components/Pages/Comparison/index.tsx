import * as React from "react";
import { hot } from "react-hot-loader";
import * as get from "lodash/get";
import { connect } from "react-redux";
import * as stats from "lib/stats";
import { OPERATORS } from "lib/constants";
import "./comparison.scss";
import OpsChart from "./OpsChart";
import PlayerLabel from "./PlayerLabel";
import AddPlayerModal from "./AddPlayerModal";
import Page, { PageHead, PageContent } from "components/misc/Page";
import Scale, { SCALES } from "components/misc/Scale";
import Stat from "components/misc/Stat";
import Fauxtable from "components/misc/Fauxtable";
import * as uniq from "lodash/uniq";

//#region data mappers

const rows = [
    { label: "platform", prop: x => get(x, "platform", "-") },
    { label: "global rank", prop: x => get(x, "placements.global", "-") },
    { label: "won", prop: x => get(x, "stats.general.won", 0) },
    { label: "lost", prop: x => get(x, "stats.general.lost", 0) },
    {
        label: "wlr",
        prop: x => stats.getWinChance(get(x, "stats.general")),
    },
    { label: "kills", prop: x => get(x, "stats.general.kills", 0) },
    { label: "deaths", prop: x => get(x, "stats.general.deaths", 0) },
    { label: "assists", prop: x => get(x, "stats.general.assists", 0) },
    {
        label: "kdr",
        prop: x => stats.getKillRatio(get(x, "stats.general", {})),
    },
    { label: "pen kills", prop: x => get(x, "stats.general.penetrationKills") },
    { label: "blindfires", prop: x => get(x, "stats.general.blindKills") },
    { label: "suicides", prop: x => get(x, "stats.general.suicides") },
    { label: "gadgets destr.", prop: x => get(x, "stats.general.gadgetsDestroyed") },
    { label: "best score bomb", prop: x => get(x, "stats.bomb.bestScore") },
    { label: "best score secure", prop: x => get(x, "stats.secure.bestScore") },
    { label: "best score hostage", prop: x => get(x, "stats.hostage.bestScore") },
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
        const ops = Object.values(get(p, "stats.operator", {})) as any[];
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
            meta: get(p, "stats.operator", {}),
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

const getDbnoAttrs = players =>
    players
        .map(p => ({
            label: p.name,
            value: get(p, "stats.general.dbno", null) | 0,
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
                    const data = get(player, ["rank", x], {});
                    return {
                        id: x,
                        games: (data.wins || 0) + (data.losses || 0) + (data.abandons || 0),
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

//#endregion data mappers
class Compare extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            showPlayerModal: false,
            ids: props.ids,
        };

        this.onAddPlayer = this.onAddPlayer.bind(this);
        this.togglePlayer = this.togglePlayer.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
    }
    onAddPlayer() {
        this.setState({ showPlayerModal: true });
    }
    togglePlayer(id: string) {
        const ids =
            this.state.ids.find(x => x === id) !== undefined
                ? this.state.ids.filter(x => x !== id)
                : this.state.ids.concat(id);

        this.setState({ ids });
    }
    onModalClose() {
        if (this.state.ids) {
            this.props.compare(this.state.ids);
        }
        this.setState({ showPlayerModal: false });
    }
    getPlayerRemovalLink(id: string) {
        return {
            type: "COMPARISON",
            query: { ids: this.props.ids.filter(x => x !== id) },
        };
    }

    render() {
        if (this.props.loading) {
            return null;
        }
        return (
            <Page className="comparison">
                <PageHead>
                    <div className="container">
                        <h1 className="header">Compare</h1>
                        <div className="comparison__playerlist playerlist">
                            <div className="playerlist__players">
                                {this.props.players.map(player => (
                                    <PlayerLabel
                                        key={player.id}
                                        removeAction={this.getPlayerRemovalLink(player.id)}
                                        {...player}
                                    />
                                ))}
                                <button className="button button--primary" onClick={this.onAddPlayer}>
                                    add player
                                </button>
                            </div>
                        </div>
                    </div>
                </PageHead>
                <PageContent>
                    <div className="container">
                        {this.state.showPlayerModal ? (
                            <AddPlayerModal
                                ids={this.state.ids}
                                onselect={this.togglePlayer}
                                onclose={this.onModalClose}
                            />
                        ) : null}
                        <div className="comparison__row">
                            <div className="comparison__module comparison__mmr">
                                <div className="comparison__module__header">MMR (most active region)</div>
                                <div className="comparison__module__content">{/* mmr chart */}</div>
                            </div>
                            <div className="comparison__module comparison__ranking">
                                <div className="comparison__module__header">Ranking</div>
                                <div className="comparison__module__content">
                                    {getRankingAttrs(this.props.players).map(player => (
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
                                    {getRankedWlAttrs(this.props.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            <Scale value={player.value} scale={SCALES.WL}>
                                                %
                                            </Scale>
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                            <div className="comparison__module comparison__ops">
                                <div className="comparison__module__header">most played Operators</div>
                                <div className="comparison__module__content">
                                    <OpsChart data={getOpsAttrs(this.props.players)} />
                                </div>
                            </div>
                        </div>
                        <div className="comparison__row">
                            <div className="comparison__module comparison__kdr">
                                <div className="comparison__module__header">KD Ratio (ranked)</div>
                                <div className="comparison__module__content">
                                    {getRankedKdAttrs(this.props.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            <Scale value={player.value} scale={SCALES.KD} />
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                            <div className="comparison__module">
                                <div className="comparison__module__header">KD Ratio (global)</div>
                                <div className="comparison__module__content">
                                    {getKdAttrs(this.props.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            <Scale value={player.value} scale={SCALES.KD} />
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                            <div className="comparison__module">
                                <div className="comparison__module__header">KDA Ratio (global)</div>
                                <div className="comparison__module__content">
                                    {getKdaAttrs(this.props.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            <Scale value={player.value} scale={SCALES.KDA} />
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="comparison__row">
                            <div className="comparison__module">
                                <div className="comparison__module__header">Accuracy</div>
                                <div className="comparison__module__content">
                                    {getAccuAttrs(this.props.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            {player.value}%
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                            <div className="comparison__module">
                                <div className="comparison__module__header">Headshots</div>
                                <div className="comparison__module__content">
                                    {getHeadshotAttrs(this.props.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            <Scale value={player.value} scale={SCALES.HS}>
                                                %
                                            </Scale>
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                            <div className="comparison__module">
                                <div className="comparison__module__header">DBNOs</div>
                                <div className="comparison__module__content">
                                    {getDbnoAttrs(this.props.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            {player.value}
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="comparison__row">
                            <div className="comparison__module">
                                <div className="comparison__module__header">Playtime</div>
                                <div className="comparison__module__content">
                                    {getPlaytimeAttrs(this.props.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            {stats.formatDuration(player.value)}
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                            <div className="comparison__module">
                                <div className="comparison__module__header">Abandons</div>
                                <div className="comparison__module__content">
                                    {getAbandonAttrs(this.props.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            {player.value}
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                            <div className="comparison__module">
                                <div className="comparison__module__header">Melee kills</div>
                                <div className="comparison__module__content">
                                    {getKnifeAttrs(this.props.players).map(player => (
                                        <Stat label={player.label} key={player.label}>
                                            {player.value}
                                        </Stat>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="comparison__row">
                            <div className="comparison__module">
                                <Fauxtable.Table className="comparison-table">
                                    <Fauxtable.Head>
                                        <Fauxtable.Row>
                                            <Fauxtable.Heading className="comparison-stat">Stat</Fauxtable.Heading>
                                            {this.props.players.map(x => (
                                                <Fauxtable.Heading className="comparison-value">
                                                    {x.name}
                                                </Fauxtable.Heading>
                                            ))}
                                        </Fauxtable.Row>
                                    </Fauxtable.Head>
                                    <Fauxtable.Body>
                                        {rows.map(row => (
                                            <Fauxtable.Row key={row.label}>
                                                <Fauxtable.Cell className="comparison-stat">{row.label}</Fauxtable.Cell>
                                                {this.props.players.map(x => (
                                                    <Fauxtable.Cell className="comparison-value">
                                                        {row.prop(x)}
                                                    </Fauxtable.Cell>
                                                ))}
                                            </Fauxtable.Row>
                                        ))}
                                    </Fauxtable.Body>
                                </Fauxtable.Table>
                            </div>
                        </div>
                    </div>
                </PageContent>
            </Page>
        );
    }
}

const mapState = state => {
    const { players, loading, location } = state;
    const ids = [].concat(get(location, "query.ids", [])).map(x => x.toLowerCase().trim());
    return {
        players: ids.map(x => players[x]).filter(x => !!x),
        ids,
        loading,
    };
};

const mapDispatch = dispatch => ({
    compare: ids =>
        dispatch({
            type: "COMPARISON",
            query: { ids: uniq(ids) },
        }),
});

export default hot(module)(connect(mapState, mapDispatch)(Compare));
