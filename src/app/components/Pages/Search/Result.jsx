import * as m from "mithril";
import { FadeImage } from "components/misc/FadeImage";
import Link from "components/misc/Link";
import Media from "components/misc/Media";
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
        player.aliases.length > 2 ? <span className="result__span"> and {player.aliases.length - 2} more</span> : null;
    return [shown, rest];
};

export default {
    view({ attrs, state }) {
        const timePlayed = get(attrs, "player.lastPlayed.ranked", 0) + get(attrs, "player.lastPlayed.casual", 0);
        return (
            <Link to={toPlayer(attrs.player.id)} className="search__result result">
                <div className="media">
                    <div className="media__image">
                        <FadeImage data-src={getImageLink((attrs.player.userId || attrs.player.id), attrs.player.platform)} />
                    </div>
                    <div className="media__content">
                        <div className="media__contentheader">
                            <header className="media__header">{attrs.player.name}</header>
                            {attrs.player.flair ? <span className="media__label">{attrs.player.flair}</span> : null}
                        </div>
                        <div className="media__text">
                            <div className="result__aliases">{getAliases(attrs.player)}</div>
                            <div className="result__info">
                                <div>level {attrs.player.level}</div>
                                <div>{formatDuration(timePlayed)} played</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    },
};
