import * as React from "react";
import { hot } from "react-hot-loader";
import { FormattedMessage } from "react-intl";
import Link from "redux-first-router-link";
import Media from "components/misc/Media";
import Loading from "components/misc/Loading";
import Result from "components/misc/Playercard";
import Page, { PageHead, PageContent } from "components/misc/Page";
import { FadeImage } from "components/misc/FadeImage";
import { connect } from "react-redux";
import { toPlayer } from "lib/store/actions";
import { formatDuration } from "lib/stats";
import { getImageLink } from "lib/domain";
import * as get from "lodash/get";
import * as api from "lib/api";

import "./favorites.scss";

import background from "assets/backgrounds/landing.jpg";
import { GLYPHS } from "components/misc/Icon";

function Favorites(props) {
    return (
        <Page className="favorites">
            <PageHead image={background} position="50% 20%">
                <div className="container container--small">
                    <h1 className="header">
                        <FormattedMessage id="favorites/title" />
                    </h1>
                </div>
            </PageHead>
            <PageContent>
                <div className="container container--small">
                    <div className="favorites__list">
                        {props.loading ? (
                            <Loading />
                        ) : props.favorites.length > 0 ? (
                            <div>
                                {props.favorites.map(player => (
                                    <Result
                                        key={player.id}
                                        player={player}
                                        action={{
                                            icon: GLYPHS.CLOSE,
                                            callback() {
                                                props.unfavoritePlayer(
                                                    player.id
                                                );
                                            }
                                        }}
                                    />
                                ))}
                                <div className="favorites__subtletext">
                                    <FormattedMessage id="favorites/addmore" />
                                </div>
                            </div>
                        ) : (
                            <FormattedMessage id="favorites/empty_header">
                                {message => (
                                    <Media title={message}>
                                        <FormattedMessage id="favorites/empty_text" />
                                    </Media>
                                )}
                            </FormattedMessage>
                        )}
                    </div>
                </div>
            </PageContent>
        </Page>
    );
}

const mapStateToProps = state => {
    const {
        favorites,
        loading,
        platform,
        players,
        location: { payload }
    } = state;

    return {
        loading,
        favorites: favorites.map(id => players[id]).filter(id => !!id),
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

export default hot(module)(
    connect(
        mapStateToProps,
        mapDispatchtoProps
    )(Favorites)
);
