import m from "mithril";
import "./leaderboard.scss";
import Log from "lib/log";
import Entry from "./Entry";
import TopEntry from "./TopEntry";
const log = Log.child(__filename);



export default {
    view({ attrs, state }) {
        return (
            attrs.data
                ? (<div className="leaderboard">
                    <div className="leaderboard-top">
                        {attrs.data.slice(0, 3).map((x, i) =>
                            <TopEntry pos={i + 1} {...x} key={x.id} />)}
                    </div>
                    <div className="leaderboard-entries">
                        {attrs.data.slice(3).map((x, i) =>
                            <Entry pos={i + 4} {...x} key={x.id} />
                        )}
                    </div>
                </div>)
                : null
        );
    }
};
