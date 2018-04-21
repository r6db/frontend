import * as React from "react";
import {
    BarChart,
    Bar,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
    LineChart,
    Line,
    Tooltip,
    YAxis,
    XAxis,
    Cell,
} from "recharts";
import { RANKS } from "lib/constants";
import Icon, { GLYPHS } from "components/misc/Icon";
import "./charts.scss";

const colors = {
    copper: "#6C3400",
    bronze: "#CD7F32",
    silver: "#999",
    gold: "#F2C649",
    platinum: "#95E0E8",
    diamond: "#0CBF9D",
};

class CustomizedTick extends React.Component<any, any> {
    render () {
        const {x, y, stroke, payload} = this.props;

       	return (
              <g transform={`translate(${x-20},${y+5})`}>
                  <Icon width="40" height="40" glyph={GLYPHS["RANK" + payload.value]} />
              </g>
        );
    }
}

class CustomizedTooltip extends React.Component<any, any> {
    render() {
        const { active } = this.props;

        if (active) {
            const { payload, label } = this.props;
            return (
            <div className="leaderboard tooltip">
                <Icon width="50" height="50" glyph={GLYPHS["RANK" + label]} />
                <div className="tooltip__box">
                    <div className="tooltip__name">{RANKS[label]}</div>
                    <div className="tooltip__value">{payload[0].value} players</div>
                </div>
            </div>
            );
        }

      return null;
    }
}

export default class LeaderboardChart extends React.PureComponent<any, any> {
    render() {
        if (!this.props.data) {
            return <div className="leaderboard charts" />;
        }
        const data = this.props.data
            .map(datum => {
                return { name: datum.rank, value: datum.amount };
            })
            .filter(x => x.name !== 0);
        return (
            <div className="leaderboard charts">
                <div className="row">
                    <ResponsiveContainer width="100%" height={175}>
                        <BarChart height={175} data={data} align="top" margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                            <defs>
                                <linearGradient id="colorCopper" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors.copper} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={colors.copper} stopOpacity={0.2} />
                                </linearGradient>
                                <linearGradient id="colorBronze" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors.bronze} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={colors.bronze} stopOpacity={0.2} />
                                </linearGradient>
                                <linearGradient id="colorSilver" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors.silver} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={colors.silver} stopOpacity={0.2} />
                                </linearGradient>
                                <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors.gold} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={colors.gold} stopOpacity={0.2} />
                                </linearGradient>
                                <linearGradient id="colorPlatinum" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors.platinum} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={colors.platinum} stopOpacity={0.2} />
                                </linearGradient>
                                <linearGradient id="colorDiamond" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors.diamond} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={colors.diamond} stopOpacity={0.2} />
                                </linearGradient>
                            </defs>
                            <XAxis interval="preserveStartEnd" minTickGap={20} dataKey="name" tick={<CustomizedTick/>} /> />
                            <YAxis tick={{ dx: -3 }} tickSize={8} scale="linear" domain={[0, "dataMax"]} />
                            <CartesianGrid stroke="inherit" vertical={false} strokeDasharray="3 3" />
                            <Tooltip content={<CustomizedTooltip/>}/>
                            <Bar name="Amount" dataKey="value" stackId="queue" fill="url(#colorEMEA)">
                                {data.map((entry, index) => {
                                    const base = RANKS[entry.name].replace(/^([a-z]+).*$/i, "$1");
                                    return (
                                        <Cell
                                            key={`cell-${index}`}
                                            stroke={colors[base.toLowerCase()]}
                                            fill={`url(#color${base})`}
                                        />
                                    );
                                })}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}
