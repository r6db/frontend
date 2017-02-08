import m from "mithril";
import { fmtD } from "lib/format";
import Stat from "./Stat";
import Operator from "./Operator";


export default {
    view: ({ attrs }) => (
        <div className="timeline-entry playday">
            <div className="playday-header">
                <span className="playday-date">{attrs.date}</span>
                <span className="playday-duration">({fmtD(attrs.timePlayed)})</span>
            </div>
            <div className="playday-content">
                <div className="playday-chartcontainer">
                    <div className="playday-chart"></div>
                </div>
                <div className="playday-stats">
                    <table className="playday-operator-column">
                        <thead>
                            <tr>
                                <th></th>
                                <th>time</th>
                                <th>wins</th>
                                <th>losses</th>
                                <th>kills</th>
                                <th>deaths</th>
                            </tr>
                        </thead>
                        <tbody>{
                            attrs.operator.map(op => (
                                <tr className="playday-operator" key={op.name}>
                                    <td>{op.name}</td>
                                    <td>{fmtD(op.timePlayed)}</td>
                                    <td>{op.won}</td>
                                    <td>{op.lost}</td>
                                    <td>{op.kills}</td>
                                    <td>{op.deaths}</td>
                                </tr>
                            ))
                        }</tbody>
                    </table>
                    <table className="playday-time-column">
                        <thead>
                            <tr>
                                <th>queue</th>
                                <th>time</th>
                            </tr>
                        </thead> 
                        <tbody>
                            <tr>
                                <td>ranked</td>
                                <td>{fmtD(attrs.matchmaking.ranked)}</td>
                            </tr>
                            <tr>
                                <td>casual</td>
                                <td>{fmtD(attrs.matchmaking.casual)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};