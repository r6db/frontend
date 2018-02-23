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

const round = (val: number, decimals = 2) => Number.parseFloat(val.toFixed(decimals));

const colors = {
    red: "#a22229",
    blue: "#0082fb",
    green: "#24a55a",
    yellow: "#ff7b00",
    orange: "#FF3924",
    teal: "#17ead9",
    aqua: "#3069cc",
};

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
                name: new Date(current.created_at).toLocaleDateString(),
                kd_casual: round(stats.getKillRatioRaw(delta.stats.casual)) || null,
                kd_ranked: round(stats.getKillRatioRaw(delta.stats.ranked)) || null,
                wl_casual: round(stats.getWinChanceRaw(delta.stats.casual) * 100) || null,
                wl_ranked: round(stats.getWinChanceRaw(delta.stats.ranked) * 100) || null,
                mmr_apac: round(current.ranks.apac.mmr),
                mmr_emea: round(current.ranks.emea.mmr),
                mmr_ncsa: round(current.ranks.ncsa.mmr),
                games_casual: delta.stats.casual.played,
                games_ranked: delta.stats.ranked.played,
                accu: round(delta.stats.general.bulletsHit / (delta.stats.general.bulletsFired || 1)) * 100,
                hs_chance: round(delta.stats.general.headshot / (delta.stats.general.bulletsHit || 1)) * 100,
            });
        }, []);
    }

    render() {
        const data = this.getData();

        return this.props.progressions ? (
            <div className="playermodule charts">
                <div className="row">
                    <div className="chart__header">MMR</div>
                    <ResponsiveContainer height={175}>
                        <AreaChart syncId="charts" data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorEMEA" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors.red} stopOpacity={0.6} />
                                    <stop offset="95%" stopColor={colors.red} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorNCSA" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors.blue} stopOpacity={0.6} />
                                    <stop offset="95%" stopColor={colors.blue} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorAPAC" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="10%" stopColor={colors.green} stopOpacity={0.8} />
                                    <stop offset="90%" stopColor={colors.green} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis tick={{ dy: +3 }} tickSize={8} dataKey="name" />
                            <YAxis tick={{ dx: -3 }} tickSize={8} domain={[0, "dataMax"]} />
                            <CartesianGrid stroke="inherit" vertical={false} strokeDasharray="3 3" />
                            <Tooltip cursor={{ stroke: "#6f7376" }} />
                            <Legend align="right" verticalAlign="bottom" />
                            <Area
                                type="monotone"
                                connectNulls
                                name="Europe"
                                dataKey="mmr_emea"
                                fill="url(#colorEMEA)"
                                dot={true}
                                stroke={colors.red}
                            />
                            <Area
                                type="monotone"
                                connectNulls
                                name="America"
                                dataKey="mmr_ncsa"
                                fill="url(#colorNCSA)"
                                dot={true}
                                stroke={colors.blue}
                            />
                            <Area
                                type="monotone"
                                connectNulls
                                name="Asia"
                                dataKey="mmr_apac"
                                fill="url(#colorAPAC)"
                                dot={true}
                                stroke={colors.green}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="row half">
                    <div className="wlratio">
                        <div className="chart__header">Win Rate (%)</div>
                        <ResponsiveContainer height={125}>
                            <AreaChart syncId="charts" data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCasualWR" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colors.yellow} stopOpacity={0.6} />
                                        <stop offset="95%" stopColor={colors.yellow} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorRankedWR" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colors.orange} stopOpacity={0.6} />
                                        <stop offset="95%" stopColor={colors.orange} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis tick={{ dy: +3 }} tickSize={8} dataKey="name" />
                                <YAxis tick={{ dx: -3 }} tickSize={8} scale="linear" domain={[0, "dataMax"]} />
                                <CartesianGrid stroke="inherit" vertical={false} strokeDasharray="3 3" />
                                <Tooltip cursor={{ stroke: "#6f7376" }} />
                                <Legend align="right" verticalAlign="bottom" />
                                <Area
                                    type="monotone"
                                    connectNulls={true}
                                    name="Casual"
                                    dataKey="wl_casual"
                                    fill="url(#colorCasualWR)"
                                    dot={true}
                                    stroke={colors.yellow}
                                />
                                <Area
                                    type="monotone"
                                    connectNulls={true}
                                    name="Ranked"
                                    dataKey="wl_ranked"
                                    fill="url(#colorRankedWR)"
                                    dot={true}
                                    stroke={colors.orange}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="kdratio">
                        <div className="chart__header">K/D Ratio</div>
                        <ResponsiveContainer height={125}>
                            <AreaChart syncId="charts" data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCasual" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colors.teal} stopOpacity={0.6} />
                                        <stop offset="95%" stopColor={colors.teal} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorRanked" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colors.aqua} stopOpacity={0.6} />
                                        <stop offset="95%" stopColor={colors.aqua} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis tick={{ dy: +3 }} tickSize={8} dataKey="name" />
                                <YAxis tick={{ dx: -3 }} tickSize={8} scale="linear" domain={[0, "dataMax"]} />
                                <CartesianGrid stroke="inherit" vertical={false} strokeDasharray="3 3" />
                                <Tooltip cursor={{ stroke: "#6f7376" }} />
                                <Legend align="right" verticalAlign="bottom" />
                                <Area
                                    type="monotone"
                                    connectNulls={true}
                                    name="Casual"
                                    dataKey="kd_casual"
                                    fill="url(#colorCasual)"
                                    dot={true}
                                    stroke={colors.teal}
                                />
                                <Area
                                    type="monotone"
                                    connectNulls={true}
                                    name="Ranked"
                                    dataKey="kd_ranked"
                                    fill="url(#colorRanked)"
                                    dot={true}
                                    stroke={colors.aqua}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="row">
                    <div className="chart__header">Accuracy & Headshots per hit (%)</div>
                    <ResponsiveContainer height={175}>
                        <AreaChart syncId="charts" data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors.red} stopOpacity={0.6} />
                                    <stop offset="95%" stopColor={colors.red} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorHSChance" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors.blue} stopOpacity={0.6} />
                                    <stop offset="95%" stopColor={colors.blue} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis tick={{ dy: +3 }} tickSize={8} dataKey="name" />
                            <YAxis tick={{ dx: -3 }} tickSize={8} scale="linear" domain={[0, "dataMax"]} />
                            <CartesianGrid stroke="inherit" vertical={false} />
                            <Tooltip cursor={{ stroke: "#6f7376" }} />
                            <Legend align="right" verticalAlign="bottom" />
                            {/** <Area
                                type="monotone"
                                dot={true}
                                connectNulls={true}
                                name="Accuracy (%)"
                                dataKey="accu"
                                stroke={colors.red}
                                fill="url(#colorAccuracy)"
                            /> */}
                            <Area
                                type="monotone"
                                dot={true}
                                connectNulls={true}
                                name="Headshots per hit (%)"
                                dataKey="hs_chance"
                                stroke={colors.blue}
                                fill="url(#colorHSChance)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        ) : null;
    }
}
