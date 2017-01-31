import m from "mithril";
import page from "page";
import { Regions } from "lib/constants";
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
                                {
                                    Object.keys(Regions)
                                        .map(l => {
                                            const lb = Regions[l];
                                            return (<option
                                                key={lb.id}
                                                selected={isSelected(lb.id, attrs.data.board)}
                                                value={lb.id}>
                                                {lb.label}</option>);
                                        })
                                }
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
                    <a href="/leaderboard/chanka">
                        <img src="/assets/chanky.png" id="chanky" alt="chanky"/>
                    </a>
                </div>)
                : null
        );
    }
};
