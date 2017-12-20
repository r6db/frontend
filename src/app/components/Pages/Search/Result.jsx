import * as m from "mithril";
import Profilepic from "components/misc/Profilepic";
import Link from "components/misc/Link";
import Media from "components/misc/Media";
import "./playercard.scss";
import { toPlayer, toProfile } from "lib/store/actions";
import { formatDuration } from "lib/stats";

const getAliases = player => {
    const shown = player.aliases.slice(0, 2).map(alias => <span className="result__span result__alias">{alias.name}</span>);
    const rest = player.aliases.length > 2
        ? <span className="result__span">+{player.aliases.length - 2} more</span>
        : null;
        return [shown, rest];
};

const getProfileLink = (profile) => {
    const id = profile.platform !== "PC" ? profile.userId : profile.id;
    const platformShorthand = ({ "PC": "uplay", "PS4": "psn", "XBOX": "xbl"}[profile.platform])
    return `https://game-rainbow6.ubi.com/en-gb/${platformShorthand}/player-statistics/${id}/multiplayer`;
};
const getImageUrl = (id, isConsole) => isConsole
    ? `//ubisoft-avatars.akamaized.net/${id}/default_146_146.png`
    : `//uplay-avatars.s3.amazonaws.com/${id}/default_146_146.png`;

export default {
    view({attrs, state}) {
        const timePlayed = attrs.player.lastPlayed.ranked + attrs.player.lastPlayed.casual;
        return (
            <Link to={toPlayer(attrs.player.id)} className="search__result result">
                <Media img={getImageUrl(attrs.player.id, attrs.isConsole)} title={attrs.player.name} label={attrs.player.flair}>
                    <div className="result__aliases">
                        {getAliases(attrs.player)}
                    </div>
                    <div className="result__info">
                        <span className="result__span">lvl {attrs.player.level}</span>
                        <span className="result__span">{formatDuration(timePlayed)} played</span>
                    </div>
                </Media>
            </Link>
        );
    }
};
