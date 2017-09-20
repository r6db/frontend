import * as m from "mithril";
import Profilepic from "components/misc/Profilepic";
import Link from "components/misc/Link";
import { toPlayer, toProfile } from "lib/store/actions";

const getTrendClass = (curr, prev) => {
    if (!prev) {
        return "is-new";
    } else if (prev < curr) {
        return "is-down"
    } else if (prev > curr) {
        return "is-up"
    } else {
        return "is-same";
    }
}
const TrendIndicator = (entry) => {
    const diff = entry.previousplacement - entry.placement
    return (
        <div className="entry-position">
            <div>
                <span className="entry-positiontext">
                    {entry.placement}
                </span>
                {entry.previousplacement
                    ? (
                        <span className={`entry-trend ${getTrendClass(entry.placement, entry.previousplacement)}`}>
                            (
                            <span className="entry-trendicon">{diff === 0 ? "▶" : diff > 0 ? "▲" : "▼"}</span>
                            {Math.abs(diff)}
                            )
                        </span>
                    )
                    : (
                        <span className={`entry-trend is-new`}>
                            ( new )
                        </span>
                    )
                }
            </div>
        </div>
    )
}

export default {
    view({ attrs }) {
        return (
            <div className={`entry playercard player-${attrs.id} ${attrs.isTopEntry ? 'is-top' : ''}`}>
                <Link to={toPlayer(attrs.id)} className="playercard-image">
                    {
                        attrs.isTopEntry
                            ? <Profilepic id={attrs.userId || attrs.id} />
                            : null
                    }
                    {TrendIndicator(attrs)}
                </Link>
                <div className="playercard-content">
                    <Link to={toPlayer(attrs.id)} className="playercard-left">
                        <header className="playercard-name">{attrs.name}</header>
                    </Link>
                    <div className="playercard-center">
                        <div className="playercard-rating">
                            <span className="entry-valuelabel">skill rating</span>
                            <span className="entry-value">
                                {attrs.value}
                            </span>
                        </div>
                    </div>
                    <div className="playercard-right">
                        <Link className="playercard-link player-simple" to={toPlayer(attrs.id)}>
                            details
                            </Link>
                        <Link className="playercard-link player-extended" to={toProfile(attrs.id)}>
                            simple View
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
};