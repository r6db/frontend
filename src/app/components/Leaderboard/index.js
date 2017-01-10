import m from "mithril";
import page from "page";
import { Leaderboards } from "lib/constants";
import "./leaderboard.scss";
import Log from "lib/log";
import Entry from "./Entry";
import TopEntry from "./TopEntry";
const log = Log.child(__filename);

const isSelected = (expected, value) => expected === value ? "selected" : undefined;

export default {
    onRegionChange(e) {
        console.log("region change", e.target.value);
        page(`/leaderboard/${e.target.value}`);
    },
    view({ attrs, state }) {
        return (
            attrs.data
                ? (<div className="leaderboard">
                    <div className="leaderboard-header">
                        <h1 className="leaderboard-title">Top Skilled Players</h1>
                        <p className="leaderboard-description">
                            We use the ranked system's 'skill' and an 'uncertainty' variables to calculate a downward adjusted skill rating
                            (aka "you're at least this good" value). That way we can ensure that players with identical skill but more games will be ranked higher.
                            For more info on the current rank system, you can read 
                            <a href="http://rainbow6.ubi.com/siege/en-gb/news/detail.aspx?c=tcm:154-277344-16&ct=tcm:148-76770-32"> this blog post by Ubisoft</a>.
                        </p>
                        <p className="leaderboard-region">
                            <label
                                className="leaderboard-regionlabel" htmlFor="regionselect">
                                Region
                            </label>
                            <select
                                id="regionselect"
                                className="leaderboard-regionselect"
                                onchange={state.onRegionChange}>
                                <option selected={isSelected("ALL", attrs.data.board)} value="ALL">Global</option>
                                <option selected={isSelected("APAC", attrs.data.board)} value="APAC">Asia & Pacific</option>
                                <option selected={isSelected("EMEA", attrs.data.board)} value="EMEA">Europe</option>
                                <option selected={isSelected("NCSA", attrs.data.board)} value="NCSA">America</option>
                            </select>
                        </p>
                    </div>
                    <div className="leaderboard-top">
                        {attrs.data.entries.slice(0, 3).map((x, i) =>
                            <TopEntry pos={i + 1} {...x} key={x.id} />)}
                    </div>
                    <div className="leaderboard-entries">
                        {attrs.data.entries.slice(3).map((x, i) =>
                            <Entry pos={i + 4} {...x} key={x.id} />
                        )}
                    </div>
                </div>)
                : null
        );
    }
};
