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
    platinum: "#95E0E8",
    diamond: "#0CBF9D",
};
export default class PlayerCharts extends React.PureComponent<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }
    componentDidMount() {
        setTimeout(() => this.setState({ show: true }), 500);
    }

    render() {
        if (!this.state.show || !this.props.data) {
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
                    <ResponsiveContainer height={175}>
                        <BarChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
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
                            <XAxis tick={{ dy: +3 }} tickSize={8} dataKey="name" />
                            <YAxis tick={{ dx: -3 }} tickSize={8} scale="linear" domain={[0, "dataMax"]} />
                            <CartesianGrid stroke="inherit" vertical={false} strokeDasharray="3 3" />
                            <Tooltip cursor={{ stroke: "#6f7376" }} />
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
