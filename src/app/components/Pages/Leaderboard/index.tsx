import * as Inferno from "inferno";
import { redirect } from "redux-first-router";
import { Leaderboards } from "lib/constants";
import { connect } from "inferno-redux";
import { toChanka, toPlayer } from "lib/store/actions";
import { getImageLink } from "lib/domain";
import Link from "components/misc/Link";
import { FadeImage } from "components/misc/FadeImage";
import Page, { PageHead, PageContent } from "components/misc/Page";
import "./leaderboard.scss";
import chanka from "./chanky.png";

import bg from "./SixInvitational_KeyArt_Teaser02.jpg";

const isSelected = (expected, value) => (expected === value ? "selected" : undefined);

class Leaderboard extends Inferno.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            board: Leaderboards.ALL.id,
        };
    }
    changeBoard(board) {
        this.setState({ board });
    }
    loadLeaderboard() {
        this.props.load(this.state.board, this.props.platform);
    }

    render() {
        return (
            <Page className="leaderboard">
                <PageHead image={bg} position="50% 20%">
                    <div className="container leaderboard__header">
                        <h1 className="header leaderboard__title">Leaderboard</h1>
                    </div>
                </PageHead>
                <PageContent>
                    <div className="container">
                        <div className="leaderboard__description">
                            <p className="is-highlight">
                                Any accounts proven to abuse the system will be removed from the leaderboard. This
                                includes queueing with coppers or hackers, hacking themselves or playing exclusively
                                imbalanced gamemodes (<a href="https://medium.com/@r6db/on-excluding-accounts-from-the-leaderboard-596cc217b2af">
                                    details and reasoning
                                </a>). If you have questions, please contact us per{" "}
                                <a href="mailto:info@r6db.com">email</a> or{" "}
                                <a href="https://twitter.com/Rainbow6_DB">Twitter</a> for help.
                            </p>
                        </div>
                        <form className="leaderboard__filters" action="" onSubmit={this.loadLeaderboard}>
                            <p className="leaderboard__platform">
                                <label htmlFor="platformselect">Platform</label>
                                <select
                                    id="platformselect"
                                    value={this.state.platform}
                                    onchange={e => this.props.changePlatform(e.target.value)}
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
                                    value={this.state.board}
                                    onchange={e => this.changeBoard(e.target.value)}
                                >
                                    {Object.keys(Leaderboards).map(l => {
                                        const lb = Leaderboards[l];
                                        return (
                                            <option
                                                key={lb.id}
                                                selected={isSelected(lb.id, this.props.board)}
                                                value={lb.id}
                                            >
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
                                {this.props.entries.map((entry, i) => (
                                    <tr className="entry" key={entry.id}>
                                        <td>
                                            <span className="entry__placement">{entry.placement}</span>
                                            <span className="entry__medal" />
                                        </td>
                                        <td>
                                            <Link to={toPlayer(entry.id)} className="entry__info">
                                                <div className="entry__image">
                                                    <FadeImage src={getImageLink(
                                                            entry.userId || entry.id,
                                                            this.props.platform,
                                                        )}
                                                    />
                                                </div>
                                                <span className="entry__name">{entry.name}</span>
                                            </Link>
                                        </td>
                                        <td className="entry__rating">{entry.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Link id="chanky" to={toChanka(this.props.platform)}>
                            <img src={chanka} />
                        </Link>
                    </div>
                </PageContent>
            </Page>
        );
    }
}

const mapStateToProps = state => {
    const { platform, leaderboard, location: { payload: { board } } } = state;
    return {
        platform,
        board,
        entries: leaderboard[board] || [],
    };
};
const mapDispatchToProps = dispatch => ({
    changePlatform: pf => dispatch({ type: "PLATFORM", payload: pf }),
    load: (board, platform) => dispatch({ type: "LEADERBOARD", payload: { board, platform } }),
    chanky: platform => dispatch({ type: "CHANKABOARD", payload: { platform } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
