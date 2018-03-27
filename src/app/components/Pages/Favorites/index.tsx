import * as React from "react";
import Link from "redux-first-router-link";
import Media from "components/misc/Media";
import Loading from "components/misc/Loading";
import Ad from "components/misc/Ad";
import Page, { PageHead, PageContent } from "components/misc/Page";
import { FadeImage } from "components/misc/FadeImage";
import { connect } from "react-redux";
import { toPlayer } from "lib/store/actions";
import { formatDuration } from "lib/stats";
import { getImageLink } from "lib/domain";
import * as get from "lodash/get";
import * as api from "lib/api";

import "./favorites.scss";
import "./playercard.scss";

import background from "assets/backgrounds/landing.jpg";

const getAliases = player => {
    const shown = player.aliases
        .slice(0, 5)
        .map(alias => alias.name)
        .join(", ");

    const rest =
        player.aliases.length > 2 ? <span key={player.id} className="result__span"> and {player.aliases.length - 2} more</span> : "";
    return [shown, rest];
};

function Result(props) {
    const timePlayed = get(props, "lastPlayed.ranked", 0) + get(props, "lastPlayed.casual", 0);
    return (
        <div>
        <Link key={props.id} to={toPlayer(props.id)} className="favorites__result result">
            <div className="media">
                <div className="media__image">
                    <FadeImage src={getImageLink(props.userId || props.id, props.platform)} />
                </div>
                <div className="media__content">
                    <div className="media__contentheader">
                        <header className="media__header">{props.name}</header>
                        {props.flair ? <span className="media__label">{props.flair}</span> : ""}
                    </div>
                    <div className="media__text">
                        <div className="result__aliases">{getAliases(props)}</div>
                        <div className="result__info">
                            <div>level {props.level}</div>
                            <div>{formatDuration(timePlayed)} played</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
      </div>
    );
}

function Favorites(props) {
    return (
        <Page className="favorites">
            <PageHead image={background} position="50% 20%">
                <div className="container leaderboard__header">
                    <h1 className="header leaderboard__title">Favorites</h1>
                </div>
            </PageHead>
            <PageContent>
                <div className="container container--small">
                    <div className="favorites__list">
                        {props.loading ? (
                            <Loading />
                        ) : props.favorites.length > 0 ? (
                            <div>
                                {props.favorites.map(player => <Result key={player.id} {...player} />)}
                            </div>
                        ) : (
                            <Media title="It's empty here!">You haven't saved any players to your favorites yet.</Media>
                        )}
                    </div>
                </div>
            </PageContent>
        </Page>
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
