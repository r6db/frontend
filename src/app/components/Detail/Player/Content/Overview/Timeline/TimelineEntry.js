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
                    <div className="playday-chart">Chart</div>
                </div>
                <div className="playday-stats">
                    <div className="playday-operator-column">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>Won</th>
                                    <th>Lost</th>
                                    <th>Kills</th>
                                    <th>Deaths</th>
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
                    </div>
                    <div className="playday-time-column">
                         <table className="playday-queues">
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
                         <table className="playday-modes">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>matches</th>
                                </tr>
                            </thead> 
                            <tbody>
                                <tr>
                                    <td>bomb</td>
                                    <td>{attrs.modes.bomb}</td>
                                </tr>
                                <tr>
                                    <td>secure</td>
                                    <td>{attrs.modes.secure}</td>
                                </tr>
                                <tr>
                                    <td>hostage</td>
                                    <td>{attrs.modes.hostage}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};