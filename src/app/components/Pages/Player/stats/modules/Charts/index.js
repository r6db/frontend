import * as m from "mithril";
import Chartist from "chartist";
import Chart, { labelInterpolationFnc } from "components/misc/Chart";
import * as stats from "lib/stats";
import "./charts.scss";

export default {
    oninit({ attrs, state }) {
        if (!attrs.progressions) {
            return;
        }
        let raw = [].concat(attrs.progressions).sort((a, b) => (a.created_at > b.created_at ? 1 : -1));

        if (raw.length > 10 && window.innerWidth < 640) {
            raw = raw.slice(-10);
        }

        const offsettedRaw = raw.slice(1);

        const getDelta = cb =>
            offsettedRaw.reduce((acc, curr, i, arr) => {
                return acc.concat(cb(curr, raw[i]));
            }, []);

        const responsiveOptions = [
            [
                "screen and (max-width: 640px)",
                {
                    seriesBarDistance: 2,
                },
            ],
        ];

        state.wlChart = {
            type: "Line",
            title: "win/loss %",
            data: {
                labels: offsettedRaw.map(x => stats.formatDate(x.created_at)),
                series: [
                    {
                        name: "ranked",
                        data: getDelta(function(curr, prev) {
                            const dWon = curr.stats.ranked.won - prev.stats.ranked.won;
                            const dLost = curr.stats.ranked.lost - prev.stats.ranked.lost;
                            const dResult = dWon / (dWon + dLost);
                            return {
                                meta: stats.formatDate(curr.created_at),
                                value: (dResult * 100).toFixed(2) || null,
                            };
                        }),
                        className: "ranked",
                    },
                    {
                        name: "casual",
                        data: getDelta(function(curr, prev) {
                            const dWon = curr.stats.casual.won - prev.stats.casual.won;
                            const dLost = curr.stats.casual.lost - prev.stats.casual.lost;
                            const dResult = dWon / (dWon + dLost);
                            return {
                                meta: stats.formatDate(curr.created_at),
                                value: (dResult * 100).toFixed(2) || null,
                            };
                        }),
                        className: "casual",
                    },
                ],
            },
            options: {
                axisX: {
                    labelInterpolationFnc,
                },
                lineSmooth: Chartist.Interpolation.monotoneCubic({
                    fillHoles: true,
                }),
            },
        };
        state.kdChart = {
            type: "Line",
            title: "k/d ratio",
            data: {
                labels: offsettedRaw.map(x => stats.formatDate(x.created_at)),
                series: [
                    {
                        name: "ranked",
                        data: getDelta(function(curr, prev) {
                            const dKills = curr.stats.ranked.kills - prev.stats.ranked.kills;
                            const dDeaths = curr.stats.ranked.deaths - prev.stats.ranked.deaths;
                            const dResult = dKills / dDeaths;
                            return {
                                meta: stats.formatDate(curr.created_at),
                                value: dResult.toFixed(2) || null,
                            };
                        }),
                        className: "ranked",
                    },
                    {
                        name: "casual",
                        data: getDelta(function(curr, prev) {
                            const dKills = curr.stats.casual.kills - prev.stats.casual.kills;
                            const dDeaths = curr.stats.casual.deaths - prev.stats.casual.deaths;
                            const dResult = dKills / dDeaths;
                            return {
                                meta: stats.formatDate(curr.created_at),
                                value: dResult.toFixed(2) || null,
                            };
                        }),
                        className: "casual",
                    },
                ],
            },
            options: {
                axisX: {
                    labelInterpolationFnc,
                },
                lineSmooth: Chartist.Interpolation.monotoneCubic({
                    fillHoles: true,
                }),
            },
            responsiveOptions,
        };

        state.mmrChart = {
            type: "Line",
            title: "MMR total",
            data: {
                labels: offsettedRaw.map(x => stats.formatDate(x.created_at)),
                series: [
                    {
                        name: "Europe, Africa & M.East",
                        data: offsettedRaw.every(
                            x => !x.ranks || (x.ranks && x.ranks.emea && x.ranks.emea.mmr === 2500),
                        )
                            ? []
                            : offsettedRaw.map(x => {
                                  return {
                                      value: x.ranks && x.ranks.emea ? x.ranks.emea.mmr.toFixed(2) : null,
                                      meta: stats.formatDate(x.created_at),
                                  };
                              }),
                        className: "emea",
                    },
                    {
                        name: "America",
                        data: offsettedRaw.every(
                            x => !x.ranks || (x.ranks && x.ranks.ncsa && x.ranks.ncsa.mmr === 2500),
                        )
                            ? []
                            : offsettedRaw.map(x => {
                                  return {
                                      value: x.ranks && x.ranks.ncsa ? x.ranks.ncsa.mmr.toFixed(2) : null,
                                      meta: stats.formatDate(x.created_at),
                                  };
                              }),
                        className: "ncsa",
                    },
                    {
                        name: "Asia",
                        data: offsettedRaw.every(
                            x => !x.ranks || (x.ranks && x.ranks.apac && x.ranks.apac.mmr === 2500),
                        )
                            ? []
                            : offsettedRaw.map(x => {
                                  return {
                                      value: x.ranks && x.ranks.apac ? x.ranks.apac.mmr.toFixed(2) : null,
                                      meta: stats.formatDate(x.created_at),
                                  };
                              }),
                        className: "apac",
                    },
                ],
            },
            options: {
                axisX: {
                    labelInterpolationFnc,
                },
            },
        };

        state.gameCountChart = {
            type: "Bar",
            title: "matches played",
            data: {
                labels: offsettedRaw.map(x => stats.formatDate(x.created_at)),
                series: [
                    {
                        name: "ranked",
                        data: getDelta(function(curr, prev) {
                            return {
                                value: curr.stats.ranked.played - prev.stats.ranked.played,
                                meta: stats.formatDate(curr.created_at),
                            };
                        }),
                        className: "ranked",
                    },
                    {
                        name: "casual",
                        data: getDelta(function(curr, prev) {
                            return {
                                value: curr.stats.casual.played - prev.stats.casual.played,
                                meta: stats.formatDate(curr.created_at),
                            };
                        }),
                        className: "casual",
                    },
                ],
            },
            options: {
                stackBars: true,
                axisX: {
                    labelInterpolationFnc,
                },
            },
            responsiveOptions,
        };

        state.hsChart = {
            type: "Line",
            title: "accuracy & headshot rate",
            data: {
                labels: offsettedRaw.map(x => stats.formatDate(x.created_at)),
                series: [
                    {
                        name: "accuracy",
                        data: getDelta(function(curr, prev) {
                            const dHit = curr.stats.general.bulletsHit - prev.stats.general.bulletsHit;
                            const dFired = curr.stats.general.bulletsFired - prev.stats.general.bulletsFired;
                            return {
                                value: (dHit * 100 / dFired).toFixed(2) || 0,
                                meta: stats.formatDate(curr.created_at),
                            };
                        }),
                        className: "accuracy",
                    },
                    {
                        name: "headshot rate",
                        data: getDelta(function(curr, prev) {
                            const dHs = curr.stats.general.headshot - prev.stats.general.headshot;
                            const dHit = curr.stats.general.bulletsHit - prev.stats.general.bulletsHit;
                            return {
                                value: (dHs * 100 / dHit).toFixed(2) || 0,
                                meta: stats.formatDate(curr.created_at),
                            };
                        }),
                        className: "hsrate",
                    },
                ],
            },
            options: {
                axisX: {
                    labelInterpolationFnc,
                },
                lineSmooth: Chartist.Interpolation.monotoneCubic({
                    fillHoles: true,
                }),
            },
            responsiveOptions,
        };
    },
    view({ attrs, state }) {
        return attrs.progressions ? (
            <div className="playermodule charts">
                <div className="row">
                    <Chart {...state.mmrChart} />
                </div>
                <div className="row">
                    <Chart {...state.wlChart} />
                </div>
                <div className="row">
                    <Chart {...state.kdChart} />
                </div>
                <div className="row">
                    <Chart {...state.gameCountChart} />
                </div>
                <div className="row">
                    <Chart {...state.hsChart} />
                </div>
            </div>
        ) : (
            ""
        );
    },
};
