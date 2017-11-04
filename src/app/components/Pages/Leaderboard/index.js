import * as m from "mithril";
import { redirect } from "redux-first-router";
import { Leaderboards } from "lib/constants";
import { connect } from "lib/store/connect";
import { toChanka } from "lib/store/actions";
import Entry from "./Entry";
import Link from "components/misc/Link";
import "./leaderboard.scss";

const isSelected = (expected, value) => expected === value ? "selected" : undefined;

const Leaderboard = {
    oninit({ attrs, state }) {
        state.platform = attrs.platform;
        state.board = Leaderboards.ALL.id;
        state.changePlatform = val => state.platform = val;
        state.changeBoard = val => state.board = val;
        state.loadLeaderboard = () => attrs.load(state.board, state.platform);
    },
    view({ attrs, state }) {
        return (
            <div className="leaderboard">
                <div className="leaderboard-header">
                    <h1 className="leaderboard-title">Top Skilled Players</h1>
                    <div className="leaderboard-description">
                        <p>
                            We use the ranked system's 'skill' and an 'uncertainty' variables to calculate a downward adjusted skill rating
                            (aka "you're at least this good" value). That way we can ensure that players with identical skill but more games will be ranked higher.
                            For more info on the current rank system, head over to the <a href="/faq">FAQ</a>.
                        </p>
                        <p className="is-highlight">
                            Any accounts proven to abuse the system will be removed from the leaderboard. This includes queueing with coppers or hackers, hacking themselves or playing exclusively imbalanced gamemodes (<a href="https://medium.com/@r6db/on-excluding-accounts-from-the-leaderboard-596cc217b2af">details and reasoning</a>). If you have questions, please contact us per <a href="mailto:info@r6db.com">email</a> or <a href="https://twitter.com/Rainbow6_DB">Twitter</a> for help.
                        </p>
                        <p>the Leaderboard updates every 24h.</p>
                    </div>
                    <form className="leaderboard-filters" action="" onsubmit={state.loadLeaderboard}>
                        <p className="leaderboard-platform">
                            <label htmlFor="platformselect">Platform</label>
                            <select id="platformselect" value={state.platform} onchange={m.withAttr("value", state.changePlatform)}>
                                <option value="PC">PC</option>
                                <option value="PS4">PS4</option>
                                <option value="XBOX">XBOX</option>
                            </select>
                        </p>
                        <p className="leaderboard-board">
                            <label
                                className="leaderboard-boardlabel" htmlFor="boardselect">
                                Board
                            </label>
                            <select
                                id="boardselect"
                                className="leaderboard-boardselect"
                                value={state.board}
                                onchange={m.withAttr("value", state.changeBoard)}>
                                {
                                    Object.keys(Leaderboards)
                                        .map(l => {
                                            const lb = Leaderboards[l];
                                            return (<option
                                                key={lb.id}
                                                selected={isSelected(lb.id, attrs.board)}
                                                value={lb.id}>
                                                {lb.label}</option>);
                                        })
                                }
                            </select>
                        </p>
                        <p>
                            <button className="button is-primary">GO</button>
                        </p>
                    </form>
                </div>
                <div className="leaderboard-entries">
                    {attrs.entries.map((x, i) =>
                        <Entry platform={attrs.platform} isTopEntry={i < 3} {...x} key={x.id} />)}
                </div>
                <Link id="chanky" to={toChanka(attrs.platform)}><img src="/assets/chanky.png" /></Link>
            </div>
        );
    }
};

const mapStateToProps = (getState) => {
    const { platform, leaderboard, location: { payload: { board } } } = getState();
    return {
        platform,
        board,
        entries: leaderboard[board] || []
    }
}
const mapDispatchToProps = (dispatch) => ({
    load: (board, platform) => dispatch({ type: "LEADERBOARD", payload: { board, platform } }),
    chanky: (platform) => dispatch({ type: "CHANKABOARD", payload: { platform } })
})

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);