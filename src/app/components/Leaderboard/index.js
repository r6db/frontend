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
                    <div className="leaderboard-header">
                        <h1 className="leaderboard-title">Top Skilled Players</h1>
                        <p className="leaderboard-description">
                            We use the he ranked systems 'skill' and an 'uncertainty' variables to calculate a downward adjusted skill rating (aka "you're at least this good" value). <br/>
                            For more info on the current rank system head you can read <a href="http://rainbow6.ubi.com/siege/en-gb/news/detail.aspx?c=tcm:154-277344-16&ct=tcm:148-76770-32">this blog post by Ubisoft</a>
                        </p>
                    </div>
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
