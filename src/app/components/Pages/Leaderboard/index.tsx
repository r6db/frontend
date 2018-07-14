import * as React from "react";
import { hot } from "react-hot-loader";
import { LEADERBOARDS } from "lib/constants";
import { connect } from "react-redux";
import { toChanka, toPlayer } from "lib/store/actions";
import { getImageLink } from "lib/domain";
import Link from "redux-first-router-link";
import { FadeImage } from "components/misc/FadeImage";
import Button from "components/misc/Button";
import Dropdown from "components/misc/Dropdown";
import Loading from "components/misc/Loading";
import Page, { PageHead, PageContent } from "components/misc/Page";
import "./leaderboard.scss";
import chanka from "./chanky.png";
import Charts from "./Charts";
import * as get from "lodash/get";

import background from "assets/backgrounds/leaderboard.jpg";
import Alert from "components/misc/Alert";

const isSelected = (expected, value) => expected === value;

const getCommunityRanks = (data, region) => {
    region = region === "ALL" ? "global" : region.toLowerCase();
    return get(data, `ranks.${region}`);
};

const boardOptions = Object.values(LEADERBOARDS).map(board => ({
    value: board.id,
    label: board.label
}));

class Leaderboard extends React.PureComponent<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            board: props.board,
            platform: props.platform
        };

        this.changePlatform = this.changePlatform.bind(this);
        this.changeBoard = this.changeBoard.bind(this);
    }
    changeBoard(board) {
        this.setState({ board });
    }
    changePlatform(platform) {
        this.setState({ platform });
    }
    loadLeaderboard(e) {
        e.preventDefault();
        this.props.load(this.state.board, this.state.platform);
    }

    render() {
        return (
            <Page className="leaderboard">
                <PageHead image={background} position="50% 25%" opacity={0.2}>
                    <div className="container">
                        <h1 className="header leaderboard__title">
                            Leaderboard
                        </h1>
                        <hr/>
                        <form
                            className="leaderboard__filters"
                            action=""
                            onSubmit={e => this.loadLeaderboard(e)}
                        >
                            <Dropdown
                                label="Platform"
                                setValue={this.state.platform}
                                options={[
                                    { value: "PC" },
                                    { value: "PS4" },
                                    { value: "XBOX" }
                                ]}
                                action={this.changePlatform}
                            />
                            <Dropdown
                                label="Board"
                                value={this.state.board}
                                options={boardOptions}
                                action={this.changeBoard}
                            />
                            <Button label="GO" role="primary" />
                        </form>
                    </div>
                </PageHead>
                <PageContent>
                    <div className="container">
                        <div className="leaderboard__description">
                            <Alert className="leaderboard__alert">
                                Any accounts abusing the ranked system will be
                                removed from the leaderboard. Our ban policy can
                                be found{" "}
                                <a href="https://pages.r6db.com/ban-policy/">
                                    here.
                                </a> Reports can be submitted over{" "}
                                <a href="https://goo.gl/forms/sYNyFwI65nCMXGrf2">
                                    this form.
                                </a>
                            </Alert>
                        </div>
                        <h3 className="header header--small">Rank distribution</h3>
                        <div className="leaderboard__chart">
                            <Charts
                                data={getCommunityRanks(
                                    this.props.community,
                                    this.state.board
                                )}
                            />
                        </div>
                        <h3 className="header header--small">Leaderboard</h3>
                        <table className="container leaderboard__entries">
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
                                            <span className="entry__placement">
                                                {entry.placement}
                                            </span>
                                            <span className="entry__medal" />
                                        </td>
                                        <td>
                                            <Link
                                                to={toPlayer(entry.id)}
                                                className="entry__info"
                                            >
                                                <div className="entry__image">
                                                    <FadeImage
                                                        src={getImageLink(
                                                            entry.userId ||
                                                                entry.id,
                                                            this.props.platform
                                                        )}
                                                    />
                                                </div>
                                                <span className="entry__name">
                                                    {entry.name}
                                                </span>
                                            </Link>
                                        </td>
                                        <td className="entry__rating">
                                            {entry.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Link id="chanky" to={toChanka(this.props.platform)}>
                            <img src={chanka} />
                        </Link>
                        {this.props.loading ? <Loading /> : null}
                    </div>
                </PageContent>
            </Page>
        );
    }
}

const mapStateToProps = state => {
    const {
        loading,
        platform,
        leaderboard,
        community,
        location: {
            payload: { board }
        }
    } = state;
    return {
        platform,
        loading,
        board,
        community,
        entries: leaderboard[board] || []
    };
};
const mapDispatchToProps = dispatch => ({
    changePlatform: pf => dispatch({ type: "PLATFORM", payload: pf }),
    load: (board, platform) =>
        dispatch({ type: "LEADERBOARD", payload: { board, platform } }),
    chanky: platform => dispatch({ type: "CHANKABOARD", payload: { platform } })
});

export default hot(module)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Leaderboard)
);
