import * as m from "mithril";
import Profilepic from "components/misc/Profilepic";
import { isConsole, platformShorthand } from "lib/constants";

const showPlayer = id => `/profile/${id}/simple`;
const showExtended = id => `/profile/${id}`


export default {
    view({ attrs }) {
        return (
            <div className={`entry playercard player-${attrs.id} ${attrs.isTopEntry ? 'is-top' : ''}`}>
                <div className="entry-background"></div>
                <a href={showPlayer(attrs.id)} className="playercard-image">
                    {
                        attrs.isTopEntry
                            ? <Profilepic id={attrs.userId || attrs.id} delay={0} />
                            : null
                    }
                    <div className="entry-position">
                        <span>{attrs.pos}</span>
                    </div>
                </a>
                <div className="playercard-content">
                    <a href={showPlayer(attrs.id)} className="playercard-left">
                        <header className="playercard-name">{attrs.name}</header>
                    </a>
                    <div className="playercard-center">
                        <span className="entry-valuelabel">skill rating</span>
                        <span className="entry-value">
                            {attrs.value}
                        </span>
                    </div>
                    <div className="playercard-right">
                        <a className="playercard-link player-simple" href={showPlayer(attrs.id)}>
                            profile
                            </a>
                        <a className="playercard-link player-extended" href={showExtended(attrs.id)}>
                            extended (beta)
                            </a>
                        { isConsole && !attrs.userId
                            ? null
                            : <a href={`https://game-rainbow6.ubi.com/en-gb/${ platformShorthand }/player-statistics/${ attrs.userId || attrs.id }/multiplayer`} className="playercard-link player-ubi">
                                Ubisoft
                            </a>
                        }
                    </div>
                </div>
            </div>
        );
    }
};

/*
<div className={`entry bottom-entry is-pos-${attrs.pos} ${attrs.className}`}>
                <div className="entry-place">{attrs.pos}</div>
                <div className="entry-content">
                    <a href={`/player/${attrs.id}`} className="entry-name">{attrs.name}</a>

                    { isConsole && !attrs.userId || !isConsole ? null : <a href={`https://game-rainbow6.ubi.com/en-gb/${ platformShorthand }/player-statistics/${ attrs.userId || attrs.id }/multiplayer`} className="entry-link">
                        › view on uplay
                    </a> }
                </div>
            </div>/*


 */