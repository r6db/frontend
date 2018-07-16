import * as React from "react";
import { hot } from "react-hot-loader";
import { FormattedMessage } from "react-intl";
import StatsTab from "./stats";
import OperatorsTab from "./Operators";
import RanksTab from "./ranks";
import NotFound from "../Errors/NotFound";
import NoPlaytime from "../Errors/NoPlaytime";
import NoAliases from "../Errors/NoAliases";
import Header from "./Header";
import { connect } from "react-redux";
import { SEASONS } from "lib/constants";
import { updatePlayer } from "lib/store/actions";
import { getImageLink } from "lib/domain";
import Loading from "components/misc/Loading";
import Page, { PageHead, PageContent } from "components/misc/Page";
import "./player.scss";

import background from "assets/backgrounds/parabellum1.jpg";

const backgroundMap = SEASONS.reduce((acc, curr) => {
    return { ...acc, [curr.id]: curr.cover };
}, {});

const dummyPlayer = {
    id: "0",
    userid: "0",
    name: "",
    platform: "",
    level: 0,
    placements: { global: null },
    isFavorite: null,
    updateAvailableAt: new Date()
};

function getPlayerSchema(player) {
    return JSON.stringify(
        {
            "@context": "http://schema.org",
            "@type": "Person",
            name: player.name,
            url: `https://r6db.com/player/${player.id}`,
            identifier: `https://r6db.com/player/${player.id}`,
            image: getImageLink(player.userId || player.id, player.platform)
        },
        null,
        4
    );
}

function Player(props) {
    if (props.loading) {
        return (
            <Page className="player">
                <PageHead image={background}>
                    <Header
                        tab={props.tab}
                        platform={props.platform}
                        updatePlayer={props.updatePlayer}
                        {...dummyPlayer}
                    />
                </PageHead>
                <PageContent>
                    <Loading />
                </PageContent>
            </Page>
        );
    } else if (!props.data) {
        return <NotFound />;
    } else if (props.data.flags && props.data.flags.noPlaytime) {
        return <NoPlaytime {...props.data} />;
    } else if (props.data.flags && props.data.flags.noAliases) {
        return <NoAliases {...props.data} />;
        // } else if (!props.data.stats || !props.data.rank) {
        //     return <NoData {...props.data} />;
    } else {
        return (
            <Page className={"player " + props.data.id}>
                <PageHead image={backgroundMap[props.season] || background}>
                    <Header
                        tab={props.tab}
                        platform={props.platform}
                        updatePlayer={props.updatePlayer}
                        {...props.data}
                    />
                </PageHead>
                <PageContent>
                    <script type="application/ld+json">{getPlayerSchema(props.data)}</script>
                    <div className="container player__tab">
                        {!props.data.stats && !props.data.rank ? (
                            <>
                                <FormattedMessage id="player/notYetLoaded" />.
                            </>
                        ) : (
                            <>
                                {props.tab === "summary" ? (
                                    <StatsTab
                                        key="summary"
                                        {...props.data}
                                        season={props.season}
                                        changeTime={props.changeTime}
                                    />
                                ) : null}
                                {props.tab === "ops" ? <OperatorsTab key="ops" {...props.data} /> : null}
                                {props.tab === "ranks" ? <RanksTab key="ranks" {...props.data} /> : null}
                            </>
                        )}
                    </div>
                </PageContent>
            </Page>
        );
    }
}

const mapStateToProps = state => {
    const {
        platform,
        isFavorite,
        favorites,
        loading,
        players,
        settings,
        location: { payload }
    } = state;

    return {
        data: players[payload.id],
        tab: payload.tab || "summary",
        loading,
        platform,
        isFavorite: favorites.includes(payload.id),
        favorites,
        season: Number.parseInt(settings.season) || -1
    };
};
const mapDispatchtoProps = (dispatch, state) => {
    return {
        updatePlayer: id => dispatch(updatePlayer(id)),
        changeTime: timeframe => dispatch({ type: "TIMEFRAME", payload: timeframe })
    };
};
export default hot(module)(
    connect(
        mapStateToProps,
        mapDispatchtoProps
    )(Player)
);
