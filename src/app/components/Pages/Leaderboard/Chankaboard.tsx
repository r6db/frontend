import * as React from "react";
import { Leaderboards } from "lib/constants";
import { connect } from "react-redux";
import { toPlayer } from "lib/store/actions";
import { getImageLink } from "lib/domain";
import FadeImage from "components/misc/FadeImage";
import Link from "redux-first-router-link";
import Page, { PageHead, PageContent } from "components/misc/Page";

import seductive from "./seductive.jpg";

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
                <PageHead image={seductive} position="50% 60%">
                    <div className="container leaderboard__header">
                        <h1 className="header leaderboard__title">Most kills with Tachanka LMG</h1>
                    </div>
                </PageHead>
                <PageContent>
                    <div className="container">
                        <div className="leaderboard__filters">
                            <p className="leaderboard__platform">
                                <label htmlFor="platformselect">Platform</label>
                                <select
                                    id="platformselect"
                                    value={this.props.platform}
                                    onChange={e => this.changePlatform(e.target.value)}
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
                                    <th>Rank</th>
                                    <th>Player</th>
                                    <th>Kills</th>
                                </tr>
                            </thead>
                            <tbody className="leaderboard__entriesbody">
                                {this.props.entries.map((entry, i) => (
                                    <tr className="entry" key={entry.id}>
                                        <td>
                                            <span className="entry__placement">{i + 1}</span>
                                            <span className="entry__medal" />
                                        </td>
                                        <td>
                                            <Link to={toPlayer(entry.id)} className="entry__info">
                                                <div className="entry__image">
                                                    <FadeImage
                                                        src={getImageLink(
                                                            entry.userId || entry.id,
                                                            this.props.platform,
                                                        )}
                                                    />
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
                </PageContent>
            </Page>
        );
    }
}
const mapStateToProps = state => {
    const { platform, chankaboard } = state;
    return {
        platform,
        entries: chankaboard || [],
    };
};
const mapDispatchToProps = dispatch => ({
    load: platform => dispatch({ type: "CHANKABOARD", payload: { platform } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chankaboard);
