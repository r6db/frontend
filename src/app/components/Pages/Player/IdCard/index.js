import * as m from "mithril";
import Profilepic from "components/misc/Profilepic";
import Icon, { GLYPHS } from "components/misc/Icon";
import Link from "components/misc/Link";
import { toProfile, toPlayerTab } from "lib/store/actions";
import "./idcard.scss";

const getProfileLink = profile => {
    const id = profile.platform !== "PC" ? profile.userId : profile.id;
    const platformShorthand = { PC: "uplay", PS4: "psn", XBOX: "xbl" }[profile.platform];
    return `https://game-rainbow6.ubi.com/en-gb/${platformShorthand}/player-statistics/${id}/multiplayer`;
};
const getEslLink = profile => `https://play.eslgaming.com/search/?query=${profile.name}&type=gameaccount`;

function ExportButton(player) {
    const href = `data:application/json;base64,${btoa(JSON.stringify(player))}`;
    return (
        <a download={`${player.name}.json`} href={href}>
            <Icon glyph={GLYPHS.DOWNLOAD} fill="white" /> export
        </a>
    );
}

export default {
    view({ attrs }) {
        return (
            <div className="idcard">
                <div className="idcard-image">
                    <Profilepic id={attrs.id} />
                    <div className="idcard-level">level {attrs.level}</div>
                </div>
                <div className="idcard-text row">
                    <div className="col idcard-names">
                        <div>
                            <div className="idcard-name">{attrs.name}</div>
                            <div className="idcard-flair">{attrs.flair}</div>
                        </div>

                        <div className="idcard-tabs">
                            <Link
                                className={attrs.tab === "stats" ? "is-active" : ""}
                                to={toPlayerTab(attrs.id, "stats")}
                            >
                                Stats
                            </Link>
                            <Link className={attrs.tab === "ops" ? "is-active" : ""} to={toPlayerTab(attrs.id, "ops")}>
                                Operators
                            </Link>
                            <Link
                                className={attrs.tab === "ranks" ? "is-active" : ""}
                                to={toPlayerTab(attrs.id, "ranks")}
                            >
                                Ranks
                            </Link>
                        </div>
                    </div>
                    <div className="col idcard-links">
                        {ExportButton(attrs)}
                        {!attrs.twitch ? (
                            ""
                        ) : (
                            <a href={attrs.twitch} target="_BLANK">
                                <Icon fill="#fff" glyph={GLYPHS.TWITCHTV} /> Twitch
                            </a>
                        )}
                        <a href={getProfileLink(attrs)} target="_BLANK">
                            <Icon glyph={GLYPHS.UBI} fill="white" /> Ubisoft
                        </a>
                        <a href={getEslLink(attrs)} target="_BLANK">
                            <Icon glyph={GLYPHS.ESL} fill="white" /> ESL
                        </a>
                    </div>
                </div>
            </div>
        );
    },
};
