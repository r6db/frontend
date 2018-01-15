import * as m from "mithril";
import Profilepic from "components/misc/Profilepic";
import Link from "components/misc/Link";
import Icon, { GLYPHS } from "components/misc/Icon";
import { toSimple, toPlayerTab } from "lib/store/actions";
import { formatDuration, getWinChance, getKillRatio } from "lib/stats";
import * as domain from "lib/domain";
import * as get from "lodash/get";
import "./playerheader.scss";

const isActive = (expected, actual) => (expected === actual ? "playerheader__tab--active" : "");

const ExportButton = player => {
    const href = `data:application/json;base64,${btoa(JSON.stringify(player))}`;
    return (
        <a className="playerheader__link" download={`${player.name}.json`} href={href}>
            <Icon glyph={GLYPHS.DOWNLOAD} /> Export
        </a>
    );
};

const PlayerHeader = {
    oninit({ attrs, state }) {
        // flip 1 second after the timeout is finished
        const timeout = attrs.updateAvailableAt - new Date() + 1000;
        state.timeout = setTimeout(m.redraw, timeout);
    },
    onremove({ state }) {
        clearTimeout(state.timeout);
    },
    view({ attrs }) {
        return (
            <div className="container playerheader">
                <div className="playerheader__content">
                    <div className="playerheader__image">
                        <Profilepic id={attrs.userId || attrs.id} />
                    </div>
                    <div className="playerheader__info">
                        <header className="header playerheader__namebox">
                            <span className="playerheader__name">
                                {attrs.name}
                            </span>
                            <span className="playerheader__platform">
                                {attrs.platform}
                            </span>
                            {attrs.flair ? <div className="playerheader__flair">{attrs.flair}</div> : null}
                        </header>
                        <div className="playerheader__level">
                            {attrs.placements.global ? "#" + (attrs.placements.global + 1) : "-"} global / lvl {attrs.level}
                        </div>
                        <div className="playerheader__links">
                            {!attrs.twitch ? (
                                ""
                            ) : (
                                <a className="playerheader__link" href={attrs.twitch} target="_BLANK">
                                    <Icon glyph={GLYPHS.TWITCHTV} /> Twitch
                                </a>
                            )}
                            <a
                                className="playerheader__link"
                                href={domain.getUbiLink(attrs.userId || attrs.id, attrs.platform)}
                                target="_BLANK"
                            >
                                <Icon glyph={GLYPHS.UBI} /> Ubisoft
                            </a>
                            <a className="playerheader__link" href={domain.getEslLink(attrs.name)} target="_BLANK">
                                <Icon glyph={GLYPHS.ESL} /> ESL
                            </a>
                            {ExportButton(attrs)}
                            <span className="playerheader__divider">|</span>
                            <Link className="playerheader__link" to={toSimple(attrs.id)} target="_BLANK">
                                                            Simple View
                            </Link>
                        </div>
                    </div>
                    <div className="playerheader__buttons">
                        {attrs.updateAvailableAt > new Date() ? (
                            <button className="button playerheader__button button--outline" disabled="disabled">
                                available {attrs.updateAvailableAt.toLocaleTimeString()}
                            </button>
                        ) : (
                            <button onclick={attrs.updatePlayer} className="button playerheader__button button--accent">
                                update
                            </button>
                        )}
                    </div>
                </div>
                <div className="playerheader__tabs">
                    <Link
                        className={`playerheader__tab ${isActive("summary", attrs.tab)}`}
                        to={toPlayerTab(attrs.id, "summary")}
                    >
                        Summary
                    </Link>
                    <Link
                        className={`playerheader__tab ${isActive("ranks", attrs.tab)}`}
                        to={toPlayerTab(attrs.id, "ranks")}
                    >
                        Ranks
                    </Link>
                    <Link
                        className={`playerheader__tab ${isActive("ops", attrs.tab)}`}
                        to={toPlayerTab(attrs.id, "ops")}
                    >
                        Operators
                    </Link>
                </div>
            </div>
        );
    },
};

export default PlayerHeader;
