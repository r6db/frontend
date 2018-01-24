import * as React from "react";
import { FadeImage } from "components/misc/FadeImage";
import Link from "redux-first-router-link";
import "./playercard.scss";
import { toPlayer } from "lib/store/actions";
import { formatDuration } from "lib/stats";
import { getImageLink } from "lib/domain";
import * as get from "lodash/get";

const getAliases = player => {
    const shown = player.aliases
        .slice(0, 5)
        .map(alias => alias.name)
        .join(", ");

    const rest =
        player.aliases.length > 2 ? <span key={player.id} className="result__span"> and {player.aliases.length - 2} more</span> : "";
    return [shown, rest];
};

export default function Result(props) {
    const timePlayed = get(props, "player.lastPlayed.ranked", 0) + get(props, "player.lastPlayed.casual", 0);
    return (
        <Link key={props.player.id} to={toPlayer(props.player.id)} className="search__result result">
            <div className="media">
                <div className="media__image">
                    <FadeImage src={getImageLink(props.player.userId || props.player.id, props.player.platform)} />
                </div>
                <div className="media__content">
                    <div className="media__contentheader">
                        <header className="media__header">{props.player.name}</header>
                        {props.player.flair ? <span className="media__label">{props.player.flair}</span> : ""}
                    </div>
                    <div className="media__text">
                        <div className="result__aliases">{getAliases(props.player)}</div>
                        <div className="result__info">
                            <div>level {props.player.level}</div>
                            <div>{formatDuration(timePlayed)} played</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
