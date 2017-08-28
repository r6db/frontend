import * as m from "mithril";
import Result from "./Result";
import { connect } from "lib/store/connect";
import "./search.scss";

const showPlayer = id => `/profile/${id}/simple`;
const showExtended = id => `/profile/${id}`

const Search = {
    view({ attrs, state }) {

        if (attrs.loading) { return ""; }
        return (
            <div className="search">
                <div className="colums is-multiline search-results">{
                    attrs.result.length > 0
                        ? attrs.result.map((player, i, total) =>
                            <Result player={player} index={i} key={player.id} href={showPlayer(player.id)} extended={showExtended(player.id)} />)
                        : <div className="playercard is-empty">
                            we could not find any player matching that name. sorry
                    </div>
                }</div>
            </div>
        );
    }
};

const mapStateToProps = (getState) => {
    const { loading, search, searchResults } = getState();
    return {
        loading,
        result: searchResults[search] || []
    }
}

export default connect(mapStateToProps)(Search);