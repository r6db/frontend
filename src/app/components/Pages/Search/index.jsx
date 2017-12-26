import * as m from "mithril";
import Result from "./Result";
import Media from "components/misc/Media";
import { connect } from "lib/store/connect";
import "./search.scss";

const showExtended = id => `/profile/${id}`;

const Search = {
    view({ attrs, state }) {
        if (attrs.loading) {
            return "";
        }
        return (
            <div className="container container--small search">
                <div className="search__results">
                    {attrs.result.length > 0 ? (
                        <div>
                            <div className="search__resultcount">
                                {attrs.result.length} results for "{attrs.search}" on {attrs.platform}
                            </div>
                            {attrs.result.map((player, i, total) => (
                                <Result player={player} index={i} key={player.id} />
                            ))}
                        </div>
                    ) : (
                        <Media title="no results">we could not find any players matching that query.</Media>
                    )}
                </div>
            </div>
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
