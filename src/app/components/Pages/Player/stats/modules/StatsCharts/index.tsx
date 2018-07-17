import * as React from "react";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
    LineChart,
    Line,
    Tooltip,
    YAxis,
    XAxis
} from "recharts";
import * as stats from "lib/stats";
import * as get from "lodash/get";
import "./charts.scss";
import { injectIntl, FormattedMessage, InjectedIntlProps, InjectedIntl } from "react-intl";

const round = (val: number, decimals = 2) => (val ? Number.parseFloat(val.toFixed(decimals)) : null);

const colors = {
    red: "#a22229",
    blue: "#0082fb",
    green: "#24a55a",
    yellow: "#ff7b00",
    orange: "#FF3924",
    teal: "#17ead9",
    aqua: "#3069cc",
    lightgreen: "#30FF6C"
};

// component to translate multiple keys at once
// example:
// <BulkTranslate msg={"id"} test={"toast"}>{msgs => (
//  <span>{msgs.msg}</span><span>{msgs.test}</span>
// )}</BulkTranslate>
const BulkTranslate = injectIntl((props: any) => {
    const intl: InjectedIntl = props.intl;
    const blacklist = ["intl", "children"];
    const translated = Object.keys(props)
        .filter(x => !blacklist.includes(x))
        .reduce((acc, curr) => {
            acc[curr] = intl.formatMessage({ id: props[curr] });
            return acc;
        }, {});
    return props.children(translated);
});
export default class StatsCharts extends React.PureComponent<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
    }
    componentDidMount() {
        setTimeout(() => this.setState({ show: true }), 250);
    }
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
                        played: diff("stats.casual.played", 0)
                    },
                    ranked: {
                        kills: diff("stats.ranked.kills", 0),
                        deaths: diff("stats.ranked.deaths", 0),
                        won: diff("stats.ranked.won", 0),
                        lost: diff("stats.ranked.lost", 0),
                        played: diff("stats.ranked.played", 0)
                    },
                    general: {
                        bulletsFired: diff("stats.general.bulletsFired", 0),
                        bulletsHit: diff("stats.general.bulletsHit", 0),
                        headshot: diff("stats.general.headshot", 0)
                    },
                    hostage: {
                        played: diff("stats.hostage.played", 0)
                    },
                    bomb: {
                        played: diff("stats.bomb.played", 0)
                    },
                    secure: {
                        played: diff("stats.secure.played", 0)
                    }
                }
            };
            return acc.concat({
                name: new Date(current.created_at).toLocaleDateString(),
                kd_casual: round(stats.getKillRatioRaw(delta.stats.casual)) || null,
                kd_ranked: round(stats.getKillRatioRaw(delta.stats.ranked)) || null,
                wl_casual: round(stats.getWinChanceRaw(delta.stats.casual) * 100) || null,
                wl_ranked: round(stats.getWinChanceRaw(delta.stats.ranked) * 100) || null,
                games_bomb: delta.stats.bomb.played,
                games_hostage: delta.stats.hostage.played,
                games_secure: delta.stats.secure.played,
                games_ranked: delta.stats.ranked.played,
                games_casual: delta.stats.casual.played,
                mmr_apac: round(get(current, "ranks.apac.mmr", null)),
                mmr_emea: round(get(current, "ranks.emea.mmr", null)),
                mmr_ncsa: round(get(current, "ranks.ncsa.mmr", null)),
                accu: round(delta.stats.general.bulletsHit / (delta.stats.general.bulletsFired || 1)) * 100,
                hs_chance: round(delta.stats.general.headshot / (delta.stats.general.bulletsHit || 1)) * 100
            });
        }, []);
    }

    render() {
        if (!this.state.show) {
            return <div className="playermodule charts player__charts player__charts--hidden" />;
        }
        const data = this.getData();
        return this.props.progressions ? (
            <div className="playermodule charts player__charts player__charts--visible">
                {this.props.rank && (
                    <div className="chart">
                        <div className="playermodule__header">
                            <div className="playermodule__title">
                                <FormattedMessage id="mmr" />
                            </div>
                        </div>
                        <div className="playermodule__divider" />
                        <BulkTranslate emea="emea/short" ncsa="ncsa/short" apac="apac/short">
                            {msgs => (
                                <ResponsiveContainer height={175}>
                                    <AreaChart
                                        syncId="charts"
                                        data={data}
                                        margin={{
                                            top: 10,
                                            right: 10,
                                            left: 0,
                                            bottom: 0
                                        }}
                                    >
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
                                        <YAxis width={60} tick={{ dx: -3 }} tickSize={8} domain={[0, "dataMax"]} />
                                        <CartesianGrid stroke="inherit" vertical={false} strokeDasharray="3 3" />
                                        <Tooltip
                                            cursor={{
                                                stroke: "#6f7376",
                                                fill: "rgba(70, 70, 70, 0.2)"
                                            }}
                                        />
                                        <Legend align="right" verticalAlign="bottom" />
                                        {this.props.rank.emea.rank ? (
                                            <Area
                                                isAnimationActive={false}
                                                type="monotone"
                                                connectNulls
                                                name={msgs.emea}
                                                dataKey="mmr_emea"
                                                fill="url(#colorEMEA)"
                                                dot={true}
                                                stroke={colors.red}
                                            />
                                        ) : null}
                                        {this.props.rank.ncsa.rank ? (
                                            <Area
                                                isAnimationActive={false}
                                                type="monotone"
                                                connectNulls
                                                name={msgs.ncsa}
                                                dataKey="mmr_ncsa"
                                                fill="url(#colorNCSA)"
                                                dot={true}
                                                stroke={colors.blue}
                                            />
                                        ) : null}
                                        {this.props.rank.apac.rank ? (
                                            <Area
                                                isAnimationActive={false}
                                                type="monotone"
                                                connectNulls
                                                name={msgs.apac}
                                                dataKey="mmr_apac"
                                                fill="url(#colorAPAC)"
                                                dot={true}
                                                stroke={colors.green}
                                            />
                                        ) : null}
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </BulkTranslate>
                    </div>
                )}
                <div className="row">
                    <div className="chart col winrate">
                        <div className="playermodule__header">
                            <div className="playermodule__title">
                                <FormattedMessage id="player/winRatePercentage" />
                            </div>
                        </div>
                        <div className="playermodule__divider" />
                        <BulkTranslate casual="player/casual" ranked="player/ranked">
                            {msgs => (
                                <ResponsiveContainer height={150}>
                                    <AreaChart
                                        syncId="charts"
                                        data={data}
                                        margin={{
                                            top: 20,
                                            right: 10,
                                            left: 0,
                                            bottom: 0
                                        }}
                                    >
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
                                        <YAxis width={30} tick={{ dx: -3 }} tickSize={8} scale="linear" domain={[0, "dataMax"]} />
                                        <CartesianGrid stroke="inherit" vertical={false} strokeDasharray="3 3" />
                                        <Tooltip
                                            cursor={{
                                                stroke: "#6f7376",
                                                fill: "rgba(70, 70, 70, 0.2)"
                                            }}
                                        />
                                        <Legend align="right" verticalAlign="bottom" />
                                        <Area
                                            isAnimationActive={false}
                                            type="monotone"
                                            connectNulls={true}
                                            name={msgs.casual}
                                            dataKey="wl_casual"
                                            fill="url(#colorCasualWR)"
                                            dot={true}
                                            stroke={colors.yellow}
                                        />
                                        <Area
                                            isAnimationActive={false}
                                            type="monotone"
                                            connectNulls={true}
                                            name={msgs.ranked}
                                            dataKey="wl_ranked"
                                            fill="url(#colorRankedWR)"
                                            dot={true}
                                            stroke={colors.orange}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </BulkTranslate>
                    </div>
                    <div className="chart col kdratio">
                        <div className="playermodule__header">
                            <div className="playermodule__title">
                                <FormattedMessage id="kdRatio" />
                            </div>
                        </div>
                        <div className="playermodule__divider" />

                        <BulkTranslate casual="player/casual" ranked="player/ranked">
                            {msgs => (
                                <ResponsiveContainer height={150}>
                                    <AreaChart
                                        syncId="charts"
                                        data={data}
                                        margin={{
                                            top: 20,
                                            right: 10,
                                            left: 0,
                                            bottom: 0
                                        }}
                                    >
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
                                        <YAxis width={30} tick={{ dx: -3 }} tickSize={8} scale="linear" domain={[0, "dataMax"]} />
                                        <CartesianGrid stroke="inherit" vertical={false} strokeDasharray="3 3" />
                                        <Tooltip
                                            cursor={{
                                                stroke: "#6f7376",
                                                fill: "rgba(70, 70, 70, 0.2)"
                                            }}
                                        />
                                        <Legend align="right" verticalAlign="bottom" />
                                        <Area
                                            isAnimationActive={false}
                                            type="monotone"
                                            connectNulls={true}
                                            name={msgs.casual}
                                            dataKey="kd_casual"
                                            fill="url(#colorCasual)"
                                            dot={true}
                                            stroke={colors.teal}
                                        />
                                        <Area
                                            isAnimationActive={false}
                                            type="monotone"
                                            connectNulls={true}
                                            name={msgs.ranked}
                                            dataKey="kd_ranked"
                                            fill="url(#colorRanked)"
                                            dot={true}
                                            stroke={colors.aqua}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </BulkTranslate>
                    </div>
                </div>
                <div className="chart hsrate">
                    <div className="playermodule__header">
                        <div className="playermodule__title">
                            <FormattedMessage id="player/accuChart" />
                        </div>
                    </div>
                    <div className="playermodule__divider" />
                    <BulkTranslate hsRate="player/hsRate" accuracy="accuracy">
                        {msgs => (
                            <ResponsiveContainer height={175}>
                                <AreaChart
                                    syncId="charts"
                                    data={data}
                                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                >
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
                                    <YAxis width={20} tick={{ dx: -3 }} tickSize={8} scale="linear" domain={[0, "dataMax"]} />
                                    <CartesianGrid stroke="inherit" vertical={false} />
                                    <Tooltip
                                        cursor={{
                                            stroke: "#6f7376",
                                            fill: "rgba(70, 70, 70, 0.2)"
                                        }}
                                    />
                                    <Legend align="right" verticalAlign="bottom" />
                                    <Area
                                        isAnimationActive={false}
                                        type="monotone"
                                        dot={true}
                                        connectNulls={true}
                                        name={msgs.hsRate}
                                        dataKey="hs_chance"
                                        stroke={colors.blue}
                                        fill="url(#colorHSChance)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </BulkTranslate>
                </div>
                <div className="row">
                    <div className="chart col gamesplayed">
                        <div className="playermodule__header">
                            <div className="playermodule__title">
                                <FormattedMessage id="player/queueChart" />
                            </div>
                        </div>
                        <div className="playermodule__divider" />
                        <BulkTranslate casual="player/casual" ranked="player/ranked">
                            {msgs => (
                                <ResponsiveContainer height={150}>
                                    <BarChart
                                        syncId="charts"
                                        data={data}
                                        margin={{
                                            top: 20,
                                            right: 10,
                                            left: 0,
                                            bottom: 0
                                        }}
                                    >
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
                                        <YAxis width={30} tick={{ dx: -5 }} tickSize={8} scale="linear" domain={[0, "dataMax"]} />
                                        <CartesianGrid stroke="inherit" vertical={false} strokeDasharray="3 3" />
                                        <Tooltip
                                            cursor={{
                                                stroke: "#6f7376",
                                                fill: "rgba(70, 70, 70, 0.2)"
                                            }}
                                        />
                                        <Legend align="right" verticalAlign="bottom" />
                                        <Bar
                                            isAnimationActive={false}
                                            name={msgs.casual}
                                            dataKey="games_casual"
                                            stackId="queue"
                                            fill="url(#colorCasual)"
                                            stroke={colors.teal}
                                        />
                                        <Bar
                                            isAnimationActive={false}
                                            name={msgs.ranked}
                                            dataKey="games_ranked"
                                            stackId="queue"
                                            fill="url(#colorRanked)"
                                            stroke={colors.aqua}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </BulkTranslate>
                    </div>
                    <div className="chart col modes">
                    <div className="playermodule__header">
                            <div className="playermodule__title">
                                <FormattedMessage id="player/modeChart" />
                            </div>
                        </div>
                        <div className="playermodule__divider" />
                        <BulkTranslate bomb="mode/bomb" secure="mode/secure" hostage="mode/hostage">
                            {msgs => (
                                <ResponsiveContainer height={150}>
                                    <BarChart
                                        syncId="charts"
                                        data={data}
                                        margin={{
                                            top: 20,
                                            right: 10,
                                            left: 0,
                                            bottom: 0
                                        }}
                                    >
                                        <defs>
                                            <linearGradient id="colorBomb" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={colors.teal} stopOpacity={0.6} />
                                                <stop offset="95%" stopColor={colors.teal} stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorSecure" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={colors.aqua} stopOpacity={0.6} />
                                                <stop offset="95%" stopColor={colors.aqua} stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorHostage" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={colors.green} stopOpacity={0.6} />
                                                <stop offset="95%" stopColor={colors.green} stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis tick={{ dy: +3 }} tickSize={8} dataKey="name" />
                                        <YAxis width={30} tick={{ dx: -5 }} tickSize={8} scale="linear" domain={[0, "dataMax"]} />
                                        <CartesianGrid stroke="inherit" vertical={false} strokeDasharray="3 3" />
                                        <Tooltip
                                            cursor={{
                                                stroke: "#6f7376",
                                                fill: "rgba(70, 70, 70, 0.2)"
                                            }}
                                        />
                                        <Legend align="right" verticalAlign="bottom" />
                                        <Bar
                                            isAnimationActive={false}
                                            stackId="mode"
                                            name={msgs.bomb}
                                            dataKey="games_bomb"
                                            fill="url(#colorBomb)"
                                            stroke={colors.teal}
                                        />
                                        <Bar
                                            isAnimationActive={false}
                                            stackId="mode"
                                            name={msgs.secure}
                                            dataKey="games_secure"
                                            fill="url(#colorSecure)"
                                            stroke={colors.aqua}
                                        />
                                        <Bar
                                            isAnimationActive={false}
                                            stackId="mode"
                                            connectNulls={true}
                                            name={msgs.hostage}
                                            dataKey="games_hostage"
                                            fill="url(#colorHostage)"
                                            stroke={colors.green}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </BulkTranslate>
                    </div>
                </div>
            </div>
        ) : null;
    }
}
