import * as React from "react";
import { hot } from "react-hot-loader";
import { FormattedMessage } from "react-intl";
import Result from "components/misc/Playercard";
import Media from "components/misc/Media";
import Loading from "components/misc/Loading";
import Page, { PageHead, PageContent } from "components/misc/Page";
import Icon, { GLYPHS } from "components/misc/Icon";
import { connect } from "react-redux";
import "./search.scss";

import background from "assets/backgrounds/bloodorchid1.jpg";

class Search extends React.PureComponent<any, any> {
    render() {
        return (
            <Page className="search">
                <PageHead image={background} position="50% 25%" opacity={0.2}>
                    <div className="container container--small">
                        <div className="header search__header">
                            <FormattedMessage id="search/query" values={{ name: this.props.search }} />
                            <span className="search__resultcount">
                                <FormattedMessage
                                    id="search/resultcount"
                                    values={{ count: this.props.result.length }}
                                />
                                <FormattedMessage
                                    id="search/resultplatform"
                                    values={{ platform: this.props.platform }}
                                />
                            </span>
                        </div>
                    </div>
                </PageHead>
                <PageContent>
                    <div className="container container--small">
                        <div className="search__results">
                            {this.props.loading ? (
                                <Loading />
                            ) : this.props.result.length > 0 ? (
                                <div>{this.props.result.map(player => <Result key={player.id} player={player} />)}</div>
                            ) : (
                                <Media icon={GLYPHS.HELP} title="No results">
                                    <FormattedMessage id="search/no_results" />
                                </Media>
                            )}
                        </div>
                    </div>
                </PageContent>
            </Page>
        );
    }
}

const mapStateToProps = state => {
    const { platform, loading, search, searchResults, location } = state;
    const query = location.payload.query;
    return {
        loading,
        result: searchResults[query] || [],
        search: query,
        platform
    };
};

export default hot(module)(connect(mapStateToProps)(Search));
