import Inferno from "inferno";
import { Leaderboards } from "lib/constants";
import { connect } from "lib/store/connect";
import { toPlayer } from "lib/store/actions";
import Link from "components/misc/Link";
import Profilepic from "components/misc/Profilepic";
import Page from "components/misc/Page";

import seductive from "./seductive.jpg";

const isSelected = (expected, value) => (expected === value ? "selected" : undefined);

const Chankaboard = {
    oninit({ attrs, state }) {
        state.platform = attrs.platform;
        state.changePlatform = val => (state.platform = val);
        state.loadLeaderboard = () => attrs.load("CHANKA", state.platform);
    },
    view({ attrs, state }) {
        return (
            <Page className="leaderboard">
                <Page.Head image={seductive} position="50% 60%">
                    <div className="container leaderboard__header">
                        <h1 className="header leaderboard__title">Most kills with Tachanka LMG</h1>
                    </div>
                </Page.Head>
                <Page.Content>
                    <div className="container">
                        <form className="leaderboard__filters" action="" onsubmit={state.loadLeaderboard}>
                            <p className="leaderboard__platform">
                                <label htmlFor="platformselect">Platform</label>
                                <select
                                    id="platformselect"
                                    value={state.platform}
                                    onchange={m.withAttr("value", state.changePlatform)}
                                >
                                    <option value="PC">PC</option>
                                    <option value="PS4">PS4</option>
                                    <option value="XBOX">XBOX</option>
                                </select>
                            </p>
                            <p>
                                <button className="button button--primary">GO</button>
                            </p>
                        </form>
                        <table className="container container-small leaderboard__entries">
                            <thead className="leaderboard__entriesheader">
                                <tr>
                                    <th>Rank</th>
                                    <th>Player</th>
                                    <th>Kills</th>
                                </tr>
                            </thead>
                            <tbody className="leaderboard__entriesbody">
                                {attrs.entries.map((entry, i) => (
                                    <tr className="entry" key={entry.id}>
                                        <td>
                                            <span className="entry__placement">{entry.placement}</span>
                                            <span className="entry__medal" />
                                        </td>
                                        <td>
                                            <Link to={toPlayer(entry.id)} className="entry__info">
                                                <div className="entry__image">
                                                    <Profilepic id={entry.userId || entry.id} />
                                                </div>
                                                <span className="entry__name">{entry.name}</span>
                                            </Link>
                                        </td>
                                        <td className="entry__rating">{entry.value | 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Page.Content>
            </Page>
        );
    },
};

const mapStateToProps = getState => {
    const { platform, leaderboard } = getState();
    return {
        platform,
        board: "CHANKA",
        entries: leaderboard["CHANKA"] || [],
    };
};
const mapDispatchToProps = dispatch => ({
    load: (board, platform) => dispatch({ type: "LEADERBOARD", payload: { board, platform } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chankaboard);
