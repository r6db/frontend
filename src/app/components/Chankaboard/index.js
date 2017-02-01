import m from "mithril";
import page from "page";
import "../Leaderboard/leaderboard.scss";
import Log from "lib/log";
import Entry from "../Leaderboard/Entry";
import TopEntry from "../Leaderboard/TopEntry";
const log = Log.child(__filename);

const isSelected = (expected, value) => expected === value ? "selected" : undefined;

export default {
    view({ attrs, state }) {
        return (
            attrs.data
                ? (<div className="leaderboard">
                    <div className="leaderboard-header">
                        <h1 className="leaderboard-title">Most kills with Tachanka LMG</h1>
                    </div>
                    <div className="leaderboard-top">
                        {attrs.data.entries.slice(0, 3).map((x, i) =>
                            <TopEntry pos={i + 1} {...x} key={x.id} measure="chankas" precision="0" />)}
                    </div>
                    <div className="leaderboard-entries">
                        {attrs.data.entries.slice(3).map((x, i) =>
                            <Entry pos={i + 4} {...x} key={x.id} measure="chankas" precision="0" />
                        )}
                    </div>
                </div>)
                : null
        );
    }
};
