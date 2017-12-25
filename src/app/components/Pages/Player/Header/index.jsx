import * as m from "mithril";
import Profilepic from "components/misc/Profilepic";
import Link from "components/misc/Link";
import Icon, { GLYPHS } from "components/misc/Icon";
import { toProfile, toPlayerTab } from "lib/store/actions";
import { formatDuration, getWinChance, getKillRatio } from "lib/stats";
import { get } from "lodash";
import "./playerheader.scss";

const isActive = (expected, actual) => (expected === actual ? "playerheader__tab--active" : "");
const getPlaytime = player => formatDuration(get(player, "stats.general.timePlayed", 0));
const getProfileLink = profile => {
    const id = profile.platform !== "PC" ? profile.userId : profile.id;
    const platformShorthand = { PC: "uplay", PS4: "psn", XBOX: "xbl" }[profile.platform];
    return `https://game-rainbow6.ubi.com/en-gb/${platformShorthand}/player-statistics/${id}/multiplayer`;
};
const getEslLink = profile => `https://play.eslgaming.com/search/?query=${profile.name}&type=gameaccount`;
const ExportButton = player => {
    const href = `data:application/json;base64,${btoa(JSON.stringify(player))}`;
    return (
        <a className="playerheader__link" download={`${player.name}.json`} href={href}>
            <Icon glyph={GLYPHS.DOWNLOAD} /> export
        </a>
    );
};

const PlayerHeader = {
    view({ attrs }) {
        return (
            <div className="container container--small playerheader">
                <div className="playerheader__content">
                    <div className="playerheader__image">
                        <Profilepic id={attrs.userId || attrs.id} />
                    </div>
                    <div className="playerheader__info">
                        <div className="playerheader__level">lvl. {attrs.level}</div>
                        <header className="header playerheader__name">
                            {attrs.name}
                            <span className="playerheader__platform">{attrs.platform}</span>
                        </header>
                        <div className="playerheader__flair">{attrs.flair}</div>
                        <div className="playerheader__ranking">
                            {get(attrs, "placements.global", null) != null
                                ? `#${get(attrs, "placements.global", null) + 1} global`
                                : null}
                        </div>
                    </div>
                    <div className="playerheader__links">
                        <div className="playerheader__links__top">
                            {ExportButton(attrs)}
                            {!attrs.twitch ? (
                                ""
                            ) : (
                                <a className="playerheader__link" href={attrs.twitch} target="_BLANK">
                                    <Icon glyph={GLYPHS.TWITCHTV} /> Twitch
                                </a>
                            )}
                            <a className="playerheader__link" href={getProfileLink(attrs)} target="_BLANK">
                                <Icon glyph={GLYPHS.UBI} /> Ubisoft
                            </a>
                            <a className="playerheader__link" href={getEslLink(attrs)} target="_BLANK">
                                <Icon glyph={GLYPHS.ESL} /> ESL
                            </a>
                        </div>
                        <div className="playerheader__links__bottom">
                            {attrs.updateAvailableAt > new Date() ? (
                                <button className="button button--outline" disabled="disabled">
                                    available {attrs.updateAvailableAt.toLocaleTimeString()}
                                </button>
                            ) : (
                                <button onclick={attrs.updatePlayer} className="button button--accent">
                                    update
                                </button>
                            )}
                        </div>
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
