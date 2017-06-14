import * as m from "mithril";
import { Operators } from "lib/constants";
import * as stats from "lib/stats";
import "./opstab.scss";

const columns = [
    {
        label: "Name",
        key: "id",
        formatter: val => Operators[val]
            ? Operators[val].name
            : val
    }, {
        label: "Wins",
        key: "won",
        formatter: val => val || 0
    },{
        label: "Losses",
        key: "lost",
        formatter: val => val || 0
    }, {
        label: "Win Ratio",
        key: "wlr",
        formatter: (_val, _key, datum) => stats.getWinChance(datum)
    }, {
        label: "Kills",
        key: "kills",
        formatter: val => val || 0
    }, {
        label: "Deaths",
        key: "deaths",
        formatter: val => val || 0
    }, {
        label: "K/D Ratio",
        key: "kdr",
        formatter: (_val, _key, datum) => stats.getKillRatio(datum)
    }, {
        label: "Time Played",
        key: "timePlayed",
        formatter: val => stats.formatDuration(val)
    },
];

const TableHeader = {
    view({ attrs }) {
        return (
            <tr>
                {attrs.columns.map(col => (
                    <th className={col.key}>{col.label}</th>
                ))}
            </tr>
        );
    }
}
const TableItem = {
    view({ attrs }) {
        return (
            <tr>
                {attrs.columns.map(col => (
                    <td className={col.key}>{
                        col.formatter
                        ? col.formatter(attrs.datum[col.key], col.key, attrs.datum)
                        : attrs.datum[col.key]
                    }</td>
                ))}
            </tr>
        )
    }
}

export default {
    oninit({ attrs, state }) {
        state.ops = Object.keys(attrs.stats.operator)
            .reduce((acc, curr) => {
                const op = attrs.stats.operator[curr];
                acc.push(Object.assign({}, op, { id: curr }));
                return acc;
            }, [])
            .sort((a, b) => stats.getWinChanceRaw(b) - stats.getWinChanceRaw(a))
    },
    view({ attrs, state }) {
        return (
            <div className="opstab">
                <table cellspacing="0">
                    <thead>
                        <TableHeader columns={columns} />
                    </thead>
                    <tbody>
                        {state.ops.map(op => <TableItem columns={columns} datum={op} />)}
                    </tbody>
                </table>
            </div>
        );
    }
}