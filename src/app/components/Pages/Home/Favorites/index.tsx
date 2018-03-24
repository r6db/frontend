import * as React from "react";
import { FadeImage } from "components/misc/FadeImage";
import Link from "redux-first-router-link";
import Icon, { GLYPHS } from "components/misc/Icon";
import { connect } from "react-redux";
import { toPlayer } from "lib/store/actions";
import * as api from "lib/api";
import * as domain from "lib/domain";
import * as get from "lodash/get";
import "./favorites.scss";

function Favorite(props) {
    return (
        <Link key={props.id} to={toPlayer(props.id)} className="favorite" >
            <div className="favorite__image">
                <FadeImage src={domain.getImageLink(props.id, props.platform)} />
            </div>
            <div className="favorite__name">{props.name}</div>
        </Link>
    );
}
function Favorites(props) {

    return (
        <div className="favorites">
            {!!props.favorites.length ? <div className="favorites__header">Favorites</div> : "" }
            <div className="favorites__list">
                {props.favorites
                    	.map(x => <Favorite key={x.id} {...x} />)
                }
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    const { favorites, loading, platform, players, location: { payload } } = state;

    return {
        loading,
        favorites:  favorites.map(id => players[id]).filter(id => !!id),
        platform,
        players
    };
};
const mapDispatchtoProps = (dispatch, state) => {
    return {
        favoritePlayer: id => dispatch({ type: "FAV_PLAYER", payload: id }),
        unfavoritePlayer: id => dispatch({ type: "UNFAV_PLAYER", payload: id })
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Favorites);
