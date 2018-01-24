import * as React from "react";
import Result from "./Result";
import Media from "components/misc/Media";
import Page, { PageHead, PageContent } from "components/misc/Page";
import { connect } from "react-redux";
import "./search.scss";

function Search(props) {
    return (
        <Page className="search">
            <PageHead>
                <div className="container">
                    <div className="header">
                        Search {props.search}
                        <span className="saerch__resultcount header header--small header--subtle">
                            {props.result.length} result(s)
                        </span>
                    </div>
                </div>
            </PageHead>
            <PageContent>
                <div className="container container--small">
                    <div className="search_results">
                        {props.result.length > 0 ? (
                            props.result.map(player => <Result key={player.id} player={player} />)
                        ) : (
                            <Media title="No results">we could not find any players matching that query.</Media>
                        )}
                    </div>
                </div>
            </PageContent>
        </Page>
    );
}

const mapStateToProps = state => {
    const { platform, loading, search, searchResults } = state;
    return {
        loading,
        result: searchResults[search] || [],
        search,
        platform,
    };
};

export default connect(mapStateToProps)(Search);
