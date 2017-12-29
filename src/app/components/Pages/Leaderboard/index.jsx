import * as m from "mithril";
import { redirect } from "redux-first-router";
import { Leaderboards } from "lib/constants";
import { connect } from "lib/store/connect";
import { toChanka, toPlayer } from "lib/store/actions";
import Link from "components/misc/Link";
import Profilepic from "components/misc/Profilepic";
import Page from "components/misc/Page";
import "./leaderboard.scss";

const isSelected = (expected, value) => (expected === value ? "selected" : undefined);

const Leaderboard = {
    oninit({ attrs, state }) {
        state.platform = attrs.platform;
        state.board = Leaderboards.ALL.id;
        state.changePlatform = val => (state.platform = val);
        state.changeBoard = val => (state.board = val);
        state.loadLeaderboard = () => attrs.load(state.board, state.platform);
    },
    view({ attrs, state }) {
        return (
            <Page className="leaderboard">
                <Page.Head>
                    <div className="container leaderboard__header">
                        <h1 className="header leaderboard__title">Top Skilled Players</h1>
                    </div>
                </Page.Head>
                <Page.Content>
                    <div className="container">
                        <div className="leaderboard__description">
                            <p>
                                We use the ranked system's 'skill' and an 'uncertainty' variables to calculate a
                                downward adjusted skill rating (aka "you're at least this good" value). That way we can
                                ensure that players with identical skill but more games will be ranked higher. For more
                                info on the current rank system, head over to the <a href="/faq">FAQ</a>.
                            </p>
                            <p className="is-highlight">
                                Any accounts proven to abuse the system will be removed from the leaderboard. This
                                includes queueing with coppers or hackers, hacking themselves or playing exclusively
                                imbalanced gamemodes (<a href="https://medium.com/@r6db/on-excluding-accounts-from-the-leaderboard-596cc217b2af">
                                    details and reasoning
                                </a>). If you have questions, please contact us per{" "}
                                <a href="mailto:info@r6db.com">email</a> or{" "}
                                <a href="https://twitter.com/Rainbow6_DB">Twitter</a> for help.
                            </p>
                            <p>the Leaderboard updates every 24h.</p>
                        </div>
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
                            <p className="leaderboard__board">
                                <label className="leaderboard__boardlabel" htmlFor="boardselect">
                                    Board
                                </label>
                                <select
                                    id="boardselect"
                                    className="leaderboard__boardselect"
                                    value={state.board}
                                    onchange={m.withAttr("value", state.changeBoard)}
                                >
                                    {Object.keys(Leaderboards).map(l => {
                                        const lb = Leaderboards[l];
                                        return (
                                            <option key={lb.id} selected={isSelected(lb.id, attrs.board)} value={lb.id}>
                                                {lb.label}
                                            </option>
                                        );
                                    })}
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
                                    <th>Rating</th>
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
                                        <td className="entry__rating">{entry.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Link id="chanky" to={toChanka(attrs.platform)}>
                            <img src="/assets/chanky.png" />
                        </Link>
                    </div>
                </Page.Content>
            </Page>
        );
    },
};

const mapStateToProps = getState => {
    const { platform, leaderboard, location: { payload: { board } } } = getState();
    return {
        platform,
        board,
        entries: leaderboard[board] || [],
    };
};
const mapDispatchToProps = dispatch => ({
    load: (board, platform) => dispatch({ type: "LEADERBOARD", payload: { board, platform } }),
    chanky: platform => dispatch({ type: "CHANKABOARD", payload: { platform } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
