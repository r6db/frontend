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
        let raw = [].concat(attrs.progressions)
            .sort((a, b) => a.created_at > b.created_at ? 1 : -1);

        const offsettedRaw = raw.slice(1);

        const getDelta = cb => offsettedRaw.reduce((acc, curr, i, arr) => {
            return acc.concat(cb(curr, raw[i]));
        }, []);

        const labelInterpolationFnc = function(value, index) {
            return index % Math.floor(raw.length/6) === 0 ? value : null;
        }

        state.wlChart = {
            type: "Line",
            title: "Win/Loss %",
            data: {
                labels: raw.map(x => stats.formatDate(x.created_at)),
                series: [{
                    name: "ranked",
                    data: getDelta(function (curr, prev) {
                        const dWon = curr.stats.ranked.won - prev.stats.ranked.won;
                        const dLost = curr.stats.ranked.lost - prev.stats.ranked.lost;
                        const dResult = dWon / (dWon + dLost);
                        return dResult * 100 || null;
                    }),
                    className: "ranked"
                }, {
                    name: "casual",
                    data: getDelta(function (curr, prev) {
                        const dWon = curr.stats.casual.won - prev.stats.casual.won;
                        const dLost = curr.stats.casual.lost - prev.stats.casual.lost;
                        const dResult = dWon / (dWon + dLost);
                        return dResult * 100 || null;
                    }),
                    className: "casual"
                }]
            },
            options: {
                axisX: {
                    labelInterpolationFnc
                }
            }
        };
        state.kdChart = {
            type: "Bar",
            title: "K/D Ratio",
            data: {
                labels: raw.map(x => stats.formatDate(x.created_at)),
                series: [{
                    name: "ranked",
                    data: getDelta(function (curr, prev) {
                        const dKills = curr.stats.ranked.kills - prev.stats.ranked.kills;
                        const dDeaths = curr.stats.ranked.deaths - prev.stats.ranked.deaths;
                        const dResult = dKills / dDeaths;
                        return dResult || null;
                    }),
                    className: "ranked"
                }, {
                    name: "casual",
                    data: getDelta(function (curr, prev) {
                        const dKills = curr.stats.casual.kills - prev.stats.casual.kills;
                        const dDeaths = curr.stats.casual.deaths - prev.stats.casual.deaths;
                        const dResult = dKills / dDeaths;
                        return dResult || null;
                    }),
                    className: "casual"
                }]
            },
            options: {
                axisX: {
                    labelInterpolationFnc
                }
            }
        };

        state.mmrChangeChart = {
            type: "Line",
            title: "MMR Change",
            data: {
                labels: offsettedRaw.map(x => stats.formatDate(x.created_at)),
                series: [{
                    name: "EMEA",
                    data: getDelta(function (curr, prev) {
                        return curr.ranks.emea.mmr - prev.ranks.emea.mmr
                    }),
                    className: "emea"
                }, {
                    name: "NCSA",
                    data: getDelta(function (curr, prev) {
                        return curr.ranks.ncsa.mmr - prev.ranks.ncsa.mmr
                    }),
                    className: "ncsa"
                }, {
                    name: "APAC",
                    data: getDelta(function (curr, prev) {
                        return curr.ranks.apac.mmr - prev.ranks.apac.mmr
                    }),
                    className: "apac"
                }]
            },
            options: {
                axisX: {
                    labelInterpolationFnc
                }
            }
        };


        state.mmrChart = {
            type: "Line",
            title: "MMR Total",
            data: {
                labels: raw.slice(1).map(x => stats.formatDate(x.created_at)),
                series: [{
                    name: "EMEA",
                    data: raw.map(x => x.ranks.emea.mmr),
                    className: "emea"
                }, {
                    name: "NCSA",
                    data: raw.map(x => x.ranks.ncsa.mmr),
                    className: "ncsa"
                }, {
                    name: "APAC",
                    data: raw.map(x => x.ranks.apac.mmr),
                    className: "apac"
                }]
            },
            options: {
                axisX: {
                    labelInterpolationFnc
                }
            }
        };

        state.gameCountChart = {
            type: "Bar",
            title: "Matches played",
            data: {
                labels: offsettedRaw.map(x => stats.formatDate(x.created_at)),
                series: [{
                    name: "ranked",
                    data: getDelta(function (curr, prev) {
                        return curr.stats.ranked.played - prev.stats.ranked.played;
                    }),
                    className: "ranked"
                }, {
                    name: "casual",
                    data: getDelta(function (curr, prev) {
                        return curr.stats.casual.played - prev.stats.casual.played;
                    }),
                    className: "casual"
                }]
            },
            options: {
                stackBars: true,
                axisX: {
                    labelInterpolationFnc
                }
            }
        };
        state.hsChart = {
            type: "Bar",
            title: "Accuracy",
            data: {
                labels: offsettedRaw.map(x => stats.formatDate(x.created_at)),
                series: [
                    getDelta(function (curr, prev) {
                        const dHit = curr.stats.general.bulletsHit - prev.stats.general.bulletsHit;
                        const dFired = curr.stats.general.bulletsFired - prev.stats.general.bulletsFired;
                        return (dHit * 100 / dFired) || 0;
                    })
                ]
            },
            options: {
                axisX: {
                    labelInterpolationFnc
                }
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
                        <div className="row">
                            <div className="col">
                                <Chart {...state.gameCountChart}/>
                            </div>
                            <div className="col">
                                <Chart {...state.hsChart}/>
                            </div>
                        </div>
                    </div>
                )
                : ""
        )
    }
}