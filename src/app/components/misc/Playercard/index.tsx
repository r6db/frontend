import * as React from "react";
import * as get from "lodash/get";
import Icon, { GLYPHS } from "components/misc/Icon";
import { RANKS, SEASONS } from "lib/constants";
import { FadeImage } from "components/misc/FadeImage";
import Link from "redux-first-router-link";
import { toPlayer } from "lib/store/actions";
import { formatDuration } from "lib/stats";
import { getImageLink } from "lib/domain";
import "./playercard.scss";

const getAliases = player => {
    const shown = player.aliases
        .slice(0, 2)
        .map(alias => alias.name)
        .join(", ");

    const rest =
        player.aliases.length > 2 ? (
            <span key={player.id} className="playercard__span">
                {" "}
                and {player.aliases.length - 2} more
            </span>
        ) : (
            ""
        );
    return [shown, rest];
};

interface IResultProps {
    player: {
        id: string;
        userId?: string;
        platform: string;
        name: string;
        flair?: string;
        level: number;
        lastPlayed: { ranked: number; casual: number };
    };
    action?: {
        icon: any;
        callback(): any;
    };
}

function ResultAction(action: IResultProps["action"]) {
    return (
        <div
            className="playercard__action"
            onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                action.callback();
            }}
        >
            <Icon glyph={action.icon} />
        </div>
    );
}

export default function Result(props: IResultProps) {
    const timePlayed = get(props, "player.lastPlayed.ranked", 0) + get(props, "player.lastPlayed.casual", 0);
    return (
        <Link key={props.player.id} to={toPlayer(props.player.id)} className="playercard">
            <div className="playercard__image">
                <FadeImage src={getImageLink(props.player.userId || props.player.id, props.player.platform)} />
            </div>
            <div className="playercard__user">
                <div className="playercard__namebox">
                    <span className="playercard__name">{props.player.name}</span>
                    {props.player.flair ? <span className="playercard__flair">{props.player.flair}</span> : ""}
                </div>
                <div className="playercard__aliases">{getAliases(props.player)}</div>
            </div>
            <div className="playercard__info hidden-small">
                <div>level {props.player.level}</div>
                <div>{formatDuration(timePlayed)} played</div>
            </div>
            {props.action ?
            <div className="playercard__actions">
                <ResultAction {...props.action} />
            </div> : null }
        </Link>
    );
}
