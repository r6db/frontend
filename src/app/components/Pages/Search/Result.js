import * as m from "mithril";
import Profilepic from "components/misc/Profilepic";
import "./playercard.scss";
import { isConsole, platformShorthand } from "lib/constants";

const round = (number, digits) => ((number * digits) | 0) / digits;

const getKd = player => player.stats.kills / player.stats.deaths;
const getWl = player => player.stats.matchesWon / player.stats.matchesLost;

const getAliases = player => {
    const shown = player.aliases.slice(0, 2).map(alias => <li>{alias.name}</li>);
    const rest = player.aliases.length > 2
        ? <li>and {player.aliases.length - 2} more</li>
        : null;
    return (
        <div className="result-aliases">
            <header className="result-aliases-header">
                known aliases
                </header>
            <ul className="result-aliases-list">
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
export default {
    view({attrs, state}) {
        return (
            <div className={`result player-${attrs.player.id}`}>
                <a href={attrs.href} className="result-image">
                    <span className="result-level">lvl {attrs.player.level}</span>
                    <Profilepic id={attrs.player.userId || attrs.player.id} delay={attrs.index} />
                </a>
                <div className="result-content">
                    <a href={attrs.href} className="result-identification">
                        <header className="result-name">{attrs.player.name}</header>
                        <span className="result-flair">{attrs.player.flair}</span>
                    </a>
                    {getAliases(attrs.player)}
                    <div className="result-links">
                        <a className="result-link player-simple" href={attrs.href}>
                            profile
                            </a>
                        <a className="result-link player-extended" href={attrs.extended}>
                            extended (beta)
                            </a>
                        { isConsole && !attrs.player.userId
                            ? null
                            : <a href={`https://game-rainbow6.ubi.com/en-gb/${ platformShorthand }/player-statistics/${ attrs.player.userId || attrs.player.id }/multiplayer`} className="result-link player-ubi">
                                Ubisoft
                            </a>
                        }
                    </div>
                </div>
            </div>
        );
    }
};
