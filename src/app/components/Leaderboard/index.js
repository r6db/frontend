import m from "mithril";
import "./leaderboard.scss";
import Log from "lib/log";
import Entry from "./Entry";
const log = Log.child(__filename);



export default {
    view({ attrs, state }) {
        return (
            attrs.data
                ? (<div className="leaderboard">
                    <h1>why are you here?</h1>
                    <h2>this is not finished yet. go away!</h2>
                    <div className="leaderboard-top">
                        {attrs.data.slice(0, 3).map((x, i) =>
                            <Entry pos={i + 1} {...x} key={x.id} />)}
                    </div>
                    {attrs.data.slice(2).map((x, i) =>
                        <Entry pos={i + 4} {...x} key={x.id} />
                    )}
                </div>)
                : null
        );
    }
};
