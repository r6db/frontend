import * as m from "mithril";
import { Leaderboards } from "lib/constants";
import { connect } from "lib/store/connect";
import "../Leaderboard/leaderboard.scss";
import Entry from "./Entry";

const isSelected = (expected, value) => expected === value ? "selected" : undefined;

const Chankaboard = {
    view({ attrs, state }) {
        return (
            <div className="leaderboard">
                <div className="leaderboard-header">
                    <h1 className="leaderboard-title">Most kills with Tachanka LMG</h1>
                </div>
                <div className="leaderboard-entries">
                    {attrs.entries.map((x, i) =>
                        <Entry isTopEntry={i < 3} pos={i + 1} {...x} key={x.id} />)}
                </div>
            </div>
        );
    }
};


const mapStateToProps = (getState) => {
    const { leaderboard } = getState();
    return {
        board: "CHANKA",
        entries: leaderboard["CHANKA"] || []
    }
}
const mapDispatchToProps = (dispatch) => ({
    changeBoard: board => dispatch({ type: "LEADERBOARD", payload: { board } })
})

export default connect(mapStateToProps, mapDispatchToProps)(Chankaboard);
