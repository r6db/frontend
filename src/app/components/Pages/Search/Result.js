import * as m from "mithril";
import Profilepic from "components/misc/Profilepic";
import Link from "components/misc/Link";
import "./playercard.scss";
import { toPlayer, toProfile } from "lib/store/actions";

const round = (number, digits) => ((number * digits) | 0) / digits;

const getKd = player => player.stats.kills / player.stats.deaths;
const getWl = player => player.stats.matchesWon / player.stats.matchesLost;

const getAliases = player => {
    const shown = player.aliases.slice(0, 2).map(alias => <li>{alias.name}</li>);
    const rest = player.aliases.length > 2
        ? <li>and {player.aliases.length - 2} more</li>
        : null;
    return (
        <div className="playercard-center playercard-aliases">
            <header className="playercard-center-header">
                known aliases
                </header>
            <ul className="playercard-center-content">
                {shown}
                {rest}
            </ul>
        </div>);
};
const getStats = player => (
    player.stats
        ? (<div className="player-stats">
            KD: {round(getKd(player), 2)}| WL: {round(getWl(player), 2)}
        </div>)
        : null
);

const getProfileLink = (profile) => {
    const id = profile.platform !== "PC" ? profile.userId : profile.id;
    const platformShorthand = ({ "PC": "uplay", "PS4": "psn", "XBOX": "xbl"}[profile.platform])
    return `https://game-rainbow6.ubi.com/en-gb/${platformShorthand}/player-statistics/${id}/multiplayer`;
};
export default {
    view({attrs, state}) {
        return (
            <div className={`playercard player-${attrs.player.id}`}>
                <div className="playercard-image">
                    <span className="playercard-level">lvl {attrs.player.level}</span>
                    <Profilepic id={attrs.player.userId || attrs.player.id} delay={attrs.index} />
                </div>
                <div className="playercard-content">
                    <Link to={toPlayer(attrs.player.id)} className="playercard-left">
                        <header className="playercard-name">{attrs.player.name}</header>
                        <span className="playercard-flair">{attrs.player.flair}</span>
                    </Link>
                    {getAliases(attrs.player)}
                    <div className="playercard-right">
                        <Link className="playercard-link player-simple" to={toPlayer(attrs.player.id)}>
                            details
                        </Link>
                        <Link className="playercard-link player-extended" to={toProfile(attrs.player.id)}>
                            simple View
                        </Link>
                        <a href={getProfileLink(attrs.player)} className="playercard-link player-ubi">
                            Ubisoft
                        </a>
                    </div>
                </div>
            </div>
        );
    }
};
