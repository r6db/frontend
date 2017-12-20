import * as m from "mithril";
import Profilepic from "components/misc/Profilepic";
import Link from "components/misc/Link";
import Media from "components/misc/Media";
import "./playercard.scss";
import { toPlayer, toProfile } from "lib/store/actions";
import { formatDuration } from "lib/stats";

const getAliases = player => {
    const shown = player.aliases
        .slice(0, 5)
        .map(alias => alias.name)
        .join(", ");

    const rest =
        player.aliases.length > 2 ? <span className="result__span"> and {player.aliases.length - 2} more</span> : null;
    return [shown, rest];
};

const getProfileLink = profile => {
    const id = profile.platform !== "PC" ? profile.userId : profile.id;
    const platformShorthand = { PC: "uplay", PS4: "psn", XBOX: "xbl" }[profile.platform];
    return `https://game-rainbow6.ubi.com/en-gb/${platformShorthand}/player-statistics/${id}/multiplayer`;
};

export default {
    view({ attrs, state }) {
        const timePlayed = attrs.player.lastPlayed.ranked + attrs.player.lastPlayed.casual;
        return (
            <Link to={toPlayer(attrs.player.id)} className="search__result result">
                <div className="media">
                    <div className="media__image">
                        <Profilepic id={attrs.player.id} />
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
