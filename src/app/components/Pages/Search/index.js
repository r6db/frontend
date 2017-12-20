import * as m from "mithril";
import Result from "./Result";
import Media from "components/misc/Media";
import { connect } from "lib/store/connect";
import "./search.scss";

const showPlayer = id => `/profile/${id}/simple`;
const showExtended = id => `/profile/${id}`

const Search = {
    view({ attrs, state }) {

        if (attrs.loading) { return ""; }
        return (
            <div className="container search">
                <div className="colums is-multiline search-results">{
                    attrs.result.length > 0
                        ? attrs.result.map((player, i, total) =>
                            <Result player={player} index={i} key={player.id} href={showPlayer(player.id)} extended={showExtended(player.id)} />)
                        :   <Media title="no results">
                                we could not find any players matching that query.
                            </Media>
                }</div>
            </div>
        );
    }
};

const mapStateToProps = (getState) => {
    const { platform, loading, search, searchResults } = getState();
    return {
        loading,
        isConsole: platform !== "PC",
        result: searchResults[search] || []
    }
}

export default connect(mapStateToProps)(Search);