import * as m from "mithril";
import Chart from 'components/misc/Chart';
import * as stats from "lib/stats";
import "./charts.scss";

const colors = {
    blue: "#2e93b3",
    orange: "#d0a344",
    green: "#47893b",
    red: "#bd1e2c",
    purple: "#6e3c87"
}

export default {
    oninit({ attrs, state }) {
        if (!attrs.progressions) {
            return;
        }
        const raw = [].concat(attrs.progressions)
            .sort((a, b) => a.created_at > b.created_at ? 1 : -1);
        const offsettedRaw = raw.slice(1);

        const getDelta = cb => offsettedRaw.reduce((acc, curr, i, arr) => {
            return acc.concat(cb(curr, raw[i]));
        }, []);

        state.wlChart = {
            type: "line",
            data: {
                labels: raw.map(x => stats.formatDate(x.created_at)),
                datasets: [{
                    label: "ranked",
                    data: getDelta(function (curr, prev) {
                        const dWon = curr.stats.ranked.won - prev.stats.ranked.won;
                        const dLost = curr.stats.ranked.lost - prev.stats.ranked.lost;
                        const dResult = dWon / (dWon + dLost);
                        return dResult * 100 || null;
                    }),
                    backgroundColor: colors.red,
                    borderColor: colors.red,
                    fill: false
                }, {
                    label: "casual",
                    data: getDelta(function (curr, prev) {
                        const dWon = curr.stats.casual.won - prev.stats.casual.won;
                        const dLost = curr.stats.casual.lost - prev.stats.casual.lost;
                        const dResult = dWon / (dWon + dLost);
                        return dResult * 100 || null;
                    }),
                    backgroundColor: colors.blue,
                    borderColor: colors.blue,
                    fill: false
                }]
            },
            options: {
                title: { display: true, text: "win/loss (%)" },
                responsive: true,
            }
        };
        state.kdChart = {
            type: "line",
            data: {
                labels: raw.map(x => stats.formatDate(x.created_at)),
                datasets: [{
                    label: "ranked",
                    data: getDelta(function (curr, prev) {
                        return curr.stats.ranked.played - prev.stats.ranked.played;
                    }),
                    backgroundColor: colors.red,
                    borderColor: colors.red,
                    fill: false
                }, {
                    label: "casual",
                    data: getDelta(function (curr, prev) {
                        return curr.stats.casual.played - prev.stats.casual.played;
                    }),
                    backgroundColor: colors.blue,
                    borderColor: colors.blue,
                    fill: false
                }, {
                    label: "total",
                    data: getDelta(function (curr, prev) {
                        const dCasual = curr.stats.casual.played - prev.stats.casual.played;
                        const dRanked = curr.stats.ranked.played - prev.stats.ranked.played;
                        return dCasual + dRanked;
                    }),
                    backgroundColor: colors.green,
                    borderColor: colors.green,
                    fill: false
                }]
            },
            options: {
                title: { display: true, text: "games played" },
                responsive: true,
            }
        };

        state.mmrChangeChart = {
            type: "line",
            responsive: true,
            data: {
                labels: offsettedRaw.map(x => stats.formatDate(x.created_at)),
                datasets: [{
                    label: "EMEA",
                    data: getDelta(function (curr, prev) {
                        return curr.ranks.emea.mmr - prev.ranks.emea.mmr
                    }),
                    backgroundColor: colors.red,
                    borderColor: colors.red,
                    fill: false
                }, {
                    label: "NCSA",
                    data: getDelta(function (curr, prev) {
                        return curr.ranks.ncsa.mmr - prev.ranks.ncsa.mmr
                    }),
                    backgroundColor: colors.blue,
                    borderColor: colors.blue,
                    fill: false
                }, {
                    label: "APAC",
                    data: getDelta(function (curr, prev) {
                        return curr.ranks.apac.mmr - prev.ranks.apac.mmr
                    }),
                    backgroundColor: colors.green,
                    borderColor: colors.green,
                    fill: false
                }]
            },
            options: {
                title: { display: true, text: "mmr change" },
                responsive: true,
                spanGaps: true,
            }
        };

        state.mmrChart = {
            type: "line",
            responsive: true,
            data: {
                labels: raw.slice(1).map(x => stats.formatDate(x.created_at)),
                datasets: [{
                    label: "EMEA",
                    data: raw.map(x => x.ranks.emea.mmr),
                    backgroundColor: colors.red,
                    borderColor: colors.red,
                    fill: false
                }, {
                    label: "NCSA",
                    data: raw.map(x => x.ranks.ncsa.mmr),
                    backgroundColor: colors.blue,
                    borderColor: colors.blue,
                    fill: false
                }, {
                    label: "APAC",
                    data: raw.map(x => x.ranks.apac.mmr),
                    backgroundColor: colors.green,
                    borderColor: colors.green,
                    fill: false
                }]
            },
            options: {
                title: { display: true, text: "mmr" },
                responsive: true,
                spanGaps: true,
            }
        };
    },
    view({ attrs, state }) {
        return (
            attrs.progressions
                ? (
                    <div className="profile-module charts">
                        <div className="row">
                            <div className="col">
                                <Chart {...state.mmrChart}/>
                            </div>
                            <div className="col">
                                <Chart {...state.mmrChangeChart}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Chart {...state.wlChart}/>
                            </div>
                            <div className="col">
                                <Chart {...state.kdChart}/>
                            </div>
                        </div>
                    </div>
                )
                : ""
        )
    }
}