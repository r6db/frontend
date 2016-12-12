import m from "mithril";
import Result from "./Result";
import Searchbar from "../misc/Searchbar";

import Log from "lib/log";
const log = Log.child(__filename);


const showPlayer = id => `/player/${id}`;


module.exports = {
    view({ attrs, state }) {
        return (
            <div className="search">
                <h1 className="title is-1 search-title">R6DB</h1>
                <Searchbar search={attrs.search} />
                <div className="colums is-multiline search-results">
                    {
                        attrs.data && attrs.data.length > 0
                            ? attrs.data.map((player, i, total) =>
                                <Result player={player} index={i} key={player.id} href={showPlayer(player.id)} />)
                            : <div className="playercard is-empty">
                                we could not find any player matching that name. sorry
                        </div>
                    }
                </div>
            </div>
        );
    }
};
