import * as m from "mithril";
import Result from "./Result";
import Media from "components/misc/Media";
import Page from "components/misc/Page";
import { connect } from "lib/store/connect";
import "./search.scss";

const showExtended = id => `/profile/${id}`;

const Search = {
    view({ attrs, state }) {
        if (attrs.loading) {
            return "";
        }
        return (
            <Page className="search">
                <Page.Head>
                    <div className="container">
                        <div className="header">
                            Search "{attrs.search}"{" "}
                            <span className="search__resultcount header header--small header--subtle">
                                {attrs.result.length} result(s)
                            </span>
                        </div>
                    </div>
                </Page.Head>
                <Page.Content>
                    <div className="container container--small">
                        <div className="search__results">
                            {attrs.result.length > 0 ? (
                                attrs.result.map((player, i, total) => (
                                    <Result player={player} index={i} key={player.id} />
                                ))
                            ) : (
                                <Media title="no results">we could not find any players matching that query.</Media>
                            )}
                        </div>
                    </div>
                </Page.Content>
            </Page>
        );
    },
};

const mapStateToProps = getState => {
    const { platform, loading, search, searchResults } = getState();
    return {
        loading,
        result: searchResults[search] || [],
        search,
        platform,
    };
};

export default connect(mapStateToProps)(Search);
