import * as m from "mithril";
import page from "page";
import { Leaderboards } from "lib/constants";
import Entry from "./Entry";
import TopEntry from "./TopEntry";
import "./leaderboard.scss";

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
                        <div className="leaderboard-description">
                            <p>
                                We use the ranked system's 'skill' and an 'uncertainty' variables to calculate a downward adjusted skill rating
                                (aka "you're at least this good" value). That way we can ensure that players with identical skill but more games will be ranked higher.
                                For more info on the current rank system, head over to the <a href="/faq">FAQ</a>.
                            </p>
                            <p className="is-highlight">
                                Any accounts proven to abuse the system will be from the leaderboard. This includes queueing with coppers or hackers, hacking themselves or playing exclusively imbalanced gamemodes (<a href="https://medium.com/@r6db/on-excluding-accounts-from-the-leaderboard-596cc217b2af">details and reasoning</a>). If you have questions, please contact us per <a href="mailto:info@r6db.com">email</a> or <a href="https://twitter.com/Rainbow6_DB">Twitter</a> for help.
                            </p>
                        <p>the Leaderboard updates every 24h.</p>
                        </div>
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
                                    Object.keys(Leaderboards)
                                        .map(l => {
                                            const lb = Leaderboards[l];
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
                    <div className="leaderboard-entries">
                        {attrs.data.entries.map((x, i) =>
                            <Entry isTopEntry={i < 3} pos={i + 1} {...x} key={x.id} />)}
                    </div>
                    <a href="/leaderboard/chanka">
                        <img src="https://r6db.com/assets/chanky.png" id="chanky" alt="chanky"/>
                    </a>
                </div>)
                : null
        );
    }
};
