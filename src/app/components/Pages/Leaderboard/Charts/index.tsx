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
import "./charts.scss";

const colors = {
    copper: "#6C3400",
    bronze: "#CD7F32",
    silver: "#999",
    gold: "#F2C649",
    platinum: "#FBE7B2",
    diamond: "#95E0E8",
};
export default class LeaderboardChart extends React.PureComponent<any, any> {
    render() {
        if (!this.props.data) {
            return <div className="leaderboard charts" />;
        }
        const data = this.props.data
            .map(datum => {
                return { name: RANKS[datum.rank], value: datum.amount };
            })
            .filter(x => x.name !== "Unranked");
        return (
            <div className="leaderboard charts">
                <div className="row">
                    <ResponsiveContainer width="100%" height={150}>
                        <BarChart height={150} data={data} align="top" margin={{ top: 20, right: 60, left: 0, bottom: 20 }}>
                            <defs>
                                <linearGradient id="colorCopper" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors.copper} stopOpacity={0.6} />
                                    <stop offset="95%" stopColor={colors.copper} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorBronze" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors.bronze} stopOpacity={0.6} />
                                    <stop offset="95%" stopColor={colors.bronze} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorSilver" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors.silver} stopOpacity={0.6} />
                                    <stop offset="95%" stopColor={colors.silver} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors.gold} stopOpacity={0.6} />
                                    <stop offset="95%" stopColor={colors.gold} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPlatinum" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors.platinum} stopOpacity={0.6} />
                                    <stop offset="95%" stopColor={colors.platinum} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorDiamond" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={colors.diamond} stopOpacity={0.6} />
                                    <stop offset="95%" stopColor={colors.diamond} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis hide dataKey="name" orientation="top" tick={false}/>
                            <YAxis />
                            <Tooltip cursor={{ stroke: "#6f7376", fill: "rgba(70, 70, 70, 0.2)" }} />
                            <Bar name="Amount" dataKey="value" stackId="queue" fill="url(#colorEMEA)">
                                {data.map((entry, index) => {
                                    const base = entry.name.replace(/^([a-z]+).*$/i, "$1");
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
