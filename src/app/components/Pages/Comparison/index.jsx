import * as m from "mithril";
import * as get from "lodash/get";
import { connect } from "lib/store/connect";
import * as stats from "lib/stats";
import "./comparison.scss";

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

const Component = {
    view({ attrs, state }) {
        return (
            <div className="comparison">
                <div className="comparison__playerlist playerlist">
                    <header className="playerlist__header">Comparing</header>
                    <div className="playerlist__players">
                        {attrs.players.map(player => (
                            <PlayerLabel {...player} />
                        ))}
                    </div>
                </div>
                <div className="fauxtable comparison-table">
                    <div className="fauxtable-head">
                        <div className="fauxtable-row">
                            <div className="fauxtable-cell comparison-stat">
                                Stat
                            </div>
                            {attrs.players.map(x => (
                                <div className="fauxtable-cell comparison-value">
                                    {x.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="fauxtable-body">
                        {rows.map(row => (
                            <div className="fauxtable-row">
                                <div className="fauxtable-cell comparison-stat">
                                    {row.label}
                                </div>
                                {attrs.players.map(x => (
                                    <div className="fauxtable-cell comparison-value">
                                        {row.prop(x)}
                                    </div>
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

const mapDispatch = (dispatch, getState) => {
    return {
        onRemove: id => () => dispatch({ type: "UNCOMPARE", payload: id }),
    };
};

export default connect(mapState, mapDispatch)(Component);
