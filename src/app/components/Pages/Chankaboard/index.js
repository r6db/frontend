import * as m from "mithril";
import { Leaderboards } from "lib/constants";
import { connect } from "lib/store/connect";
import "../Leaderboard/leaderboard.scss";
import Entry from "./Entry";

const isSelected = (expected, value) => expected === value ? "selected" : undefined;

const Chankaboard = {
    oninit({ attrs, state }) {
        state.platform = attrs.platform;
        state.changePlatform = val => state.platform = val;
        state.loadLeaderboard = () => attrs.load("CHANKA", state.platform);
    },
    view({ attrs, state }) {
        return (
            <div className="leaderboard">
                <div className="leaderboard-header">
                    <h1 className="leaderboard-title">Most kills with Tachanka LMG</h1>
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
                <p>
                    <button className="button is-primary">GO</button>
                </p>
            </form>
                <div className="leaderboard-entries">
                    {attrs.entries.map((x, i) =>
                        <Entry isTopEntry={i < 3} pos={i + 1} {...x} key={x.id} />)}
                </div>
            </div>
        );
    }
};


const mapStateToProps = (getState) => {
    const { platform, leaderboard } = getState();
    return {
        platform,
        board: "CHANKA",
        entries: leaderboard["CHANKA"] || []
    }
}
const mapDispatchToProps = (dispatch) => ({
    load: (board, platform) => dispatch({ type: "LEADERBOARD", payload: { board, platform } }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Chankaboard);
