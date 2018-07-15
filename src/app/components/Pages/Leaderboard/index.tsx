import * as React from "react";
import { hot } from "react-hot-loader";
import { FormattedMessage } from "react-intl";
import { redirect } from "redux-first-router";
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
                <PageHead image={background} position="50% 20%">
                    <div className="container leaderboard__header">
                        <h1 className="header leaderboard__title">
                            <FormattedMessage id="leaderboard/title" />
                        </h1>
                    </div>
                </PageHead>
                <PageContent>
                    <div className="container">
                        <div className="leaderboard__description">
                            <div className="blocker">
                                <FormattedMessage
                                    id="leaderboard/disclaimer"
                                    values={{
                                        linkPolicy: <a href="https://pages.r6db.com/ban-policy/">Ban Policy</a>,
                                        linkReport: <a href="https://goo.gl/forms/sYNyFwI65nCMXGrf2">Google Form</a>
                                    }}
                                />
                            </div>
                        </div>
                        <form className="leaderboard__filters" action="" onSubmit={e => this.loadLeaderboard(e)}>
                            <Dropdown
                                label={<FormattedMessage id="platform" />}
                                setValue={this.state.platform}
                                options={[{ value: "PC" }, { value: "PS4" }, { value: "XBOX" }]}
                                action={this.changePlatform}
                            />

                            <Dropdown
                                label={<FormattedMessage id="board" />}
                                value={this.state.board}
                                options={boardOptions}
                                action={this.changeBoard}
                            />
                            <p>
                                <Button label={<FormattedMessage id="leaderboard/go" />} role="primary" />
                            </p>
                        </form>
                        <Charts data={getCommunityRanks(this.props.community, this.state.board)} />
                        <table className="container leaderboard__entries">
                            <thead className="leaderboard__entriesheader">
                                <tr>
                                    <th>
                                        <FormattedMessage id="rank" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="player" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="rating" />
                                    </th>
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
                                                    <FadeImage
                                                        src={getImageLink(
                                                            entry.userId || entry.id,
                                                            this.props.platform
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
    load: (board, platform) => dispatch({ type: "LEADERBOARD", payload: { board, platform } }),
    chanky: platform => dispatch({ type: "CHANKABOARD", payload: { platform } })
});

export default hot(module)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Leaderboard)
);
