import m from "mithril";
import Result from "./Result";
import "./search.scss";

const showPlayer = id => `/player/${id}`;

module.exports = {
    view({ attrs, state }) {
        const resultList = attrs.data.result ? attrs.data.result : [];

        if (attrs.loading) { return ""; }
        return (
            <div className="search">
                <div className="colums is-multiline search-results">{
                    resultList.length > 0
                        ? resultList.map((player, i, total) =>
                            <Result player={player} index={i} key={player.id} href={showPlayer(player.id)} />)
                        : <div className="playercard is-empty">
                            we could not find any player matching that name. sorry
                    </div>
                }</div>
            </div>
        );
    }
};
