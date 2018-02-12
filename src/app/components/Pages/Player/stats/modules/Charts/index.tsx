import * as React from "react";
import {
    AreaChart,
    Area,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
    LineChart,
    Line,
    Tooltip,
    YAxis,
    XAxis,
} from "recharts";
import * as stats from "lib/stats";
import * as get from "lodash/get";
import "./charts.scss";

export default class PlayerCharts extends React.Component<any, any> {
    getData() {
        const progs = this.props.progressions || [];

        return progs.slice(1).reduce((acc, curr, i) => {
            const current = curr;
            const previous = progs[i];

            function diff(key, defaultValue) {
                return get(current, key, defaultValue) - get(previous, key, defaultValue);
            }

            const delta = {
                stats: {
                    casual: {
                        kills: diff("stats.casual.kills", 0),
                        deaths: diff("stats.casual.deaths", 0),
                        won: diff("stats.casual.won", 0),
                        lost: diff("stats.casual.lost", 0),
                        played: diff("stats.casual.played", 0),
                    },
                    ranked: {
                        kills: diff("stats.ranked.kills", 0),
                        deaths: diff("stats.ranked.deaths", 0),
                        won: diff("stats.ranked.won", 0),
                        lost: diff("stats.ranked.lost", 0),
                        played: diff("stats.ranked.played", 0),
                    },
                    general: {
                        bulletsFired: diff("stats.general.bulletsFired", 0),
                        bulletsHit: diff("stats.general.bulletsHit", 0),
                        headshot: diff("stats.general.headshot", 0),
                    },
                },
            };

            return acc.concat({
                name: i,
                kd_casual: stats.getKillRatioRaw(delta.stats.casual) || null,
                kd_ranked: stats.getKillRatioRaw(delta.stats.ranked) || null,
                wl_casual: stats.getWinChanceRaw(delta.stats.casual) || null,
                wl_ranked: stats.getRankWinChanceRaw(delta.stats.ranked) || null,
                // prepend + to corerce back to number
                mmr_apac: +current.ranks.apac.mmr.toFixed(2),
                mmr_emea: +current.ranks.emea.mmr.toFixed(2),
                mmr_ncsa: +current.ranks.ncsa.mmr.toFixed(2),
                games_casual: delta.stats.casual.played,
                games_ranked: delta.stats.ranked.played,
                accu: delta.stats.general.bulletsHit / (delta.stats.general.bulletsFired || 1),
                hs_chance: delta.stats.general.headshot / (delta.stats.general.bulletsFired || 1),
            });
        }, []);
    }

    render() {
        const data = this.getData();

        return this.props.progressions ? (
            <div className="playermodule charts">
                <div className="row">
                    <ResponsiveContainer height={100}>
                        <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="area1" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="area2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="area3" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f00" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#f44" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <YAxis domain={[0, "dataMax"]} />
                            {/* 6f7376 == $gray */}
                            <Tooltip cursor={{ stroke: "#6f7376" }} />
                            <Legend align="right" verticalAlign="bottom" />
                            <Area type="monotone" connectNulls name="Asia" dataKey="mmr_apac" fill="url(#area1)" />
                            <Area type="monotone" connectNulls name="Europe" dataKey="mmr_emea" fill="url(#area2)" />
                            <Area type="monotone" connectNulls name="America" dataKey="mmr_ncsa" fill="url(#area3)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="row">
                    <ResponsiveContainer height={100}>
                        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <YAxis domain={[0, 1]} />
                            <Tooltip cursor={{ stroke: "#6f7376" }} />
                            <Legend align="right" verticalAlign="bottom" />
                            <Line type="monotone" connectNulls name="Casual" dataKey="wl_casual" stroke="red" />
                            <Line type="monotone" connectNulls name="Ranked" dataKey="wl_ranked" stroke="blue" />
                        </LineChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer height={100}>
                        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <YAxis domain={[0, "dataMax"]} />
                            <Tooltip cursor={{ stroke: "#6f7376" }} />
                            <Legend align="right" verticalAlign="bottom" />
                            <Line type="monotone" connectNulls name="Casual" dataKey="kd_casual" stroke="red" />
                            <Line type="monotone" connectNulls name="Ranked" dataKey="kd_ranked" stroke="blue" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="row">
                    <ResponsiveContainer height={100}>
                        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <YAxis domain={[0, "dataMax"]} />
                            <Tooltip cursor={{ stroke: "#6f7376" }} />
                            <Legend align="right" verticalAlign="bottom" />
                            <Line type="monotone" connectNulls name="Accuracy" dataKey="accu" stroke="red" />
                            <Line type="monotone" connectNulls name="HS Chance" dataKey="hs_chance" stroke="blue" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        ) : null;
    }
}
