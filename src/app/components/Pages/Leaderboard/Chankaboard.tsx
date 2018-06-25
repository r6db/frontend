import * as React from "react";
import { hot } from "react-hot-loader";
import { FormattedMessage } from "react-intl";
import { LEADERBOARDS } from "lib/constants";
import { connect } from "react-redux";
import { toPlayer } from "lib/store/actions";
import { getImageLink } from "lib/domain";
import Link from "redux-first-router-link";
import FadeImage from "components/misc/FadeImage";
import Loading from "components/misc/Loading";
import Page, { PageHead, PageContent } from "components/misc/Page";

import background from "assets/backgrounds/chankaboard.jpg";

const isSelected = (expected, value) => expected === value;

class Chankaboard extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    changePlatform(pf) {
        this.props.changePlatform(pf);
        this.props.load(pf);
    }
    render() {
        return (
            <Page className="leaderboard">
                <PageHead image={background} position="50% 60%">
                    <div className="container leaderboard__header">
                        <h1 className="header leaderboard__title">
                            <FormattedMessage id="chankaboard" />
                        </h1>
                    </div>
                </PageHead>
                <PageContent>
                    <div className="container">
                        <div className="leaderboard__filters">
                            <p className="leaderboard__platform">
                                <FormattedMessage id="platform">
                                    {msg => (
                                        <label
                                            className="leaderboard__platformlabel"
                                            htmlFor="platformselect"
                                        >
                                            {msg}
                                        </label>
                                    )}
                                </FormattedMessage>
                                <select
                                    id="platformselect"
                                    value={this.props.platform}
                                    onChange={e =>
                                        this.changePlatform(e.target.value)
                                    }
                                >
                                    <option value="PC">PC</option>
                                    <option value="PS4">PS4</option>
                                    <option value="XBOX">XBOX</option>
                                </select>
                            </p>
                        </div>
                        <table className="container container-small leaderboard__entries">
                            <thead className="leaderboard__entriesheader">
                                <tr>
                                    <th>
                                        <FormattedMessage id="rank" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="player" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="kills" />
                                    </th>
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
                                            {entry.value | 0}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {this.props.loading ? <Loading /> : null}
                    </div>
                </PageContent>
            </Page>
        );
    }
}
const mapStateToProps = state => {
    const { loading, platform, chankaboard } = state;
    return {
        loading,
        platform,
        entries: chankaboard || []
    };
};
const mapDispatchToProps = dispatch => ({
    changePlatform: pf => dispatch({ type: "PLATFORM", payload: pf }),
    load: platform => dispatch({ type: "CHANKABOARD", payload: { platform } })
});

export default hot(module)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Chankaboard)
);
