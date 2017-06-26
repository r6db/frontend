import * as m from "mithril";
import Profilepic from "components/misc/Profilepic";
import { isConsole, platformShorthand } from "lib/constants";
import "./idcard.scss";

const getProfileLink = profile => {
    const id = isConsole ? profile.userId : profile.id;
    return `https://game-rainbow6.ubi.com/en-gb/${platformShorthand}/player-statistics/${id}/multiplayer`
}
const getEslLink = profile => `https://play.eslgaming.com/search/?query=${profile.name}&type=gameaccount`

export default {
    view({ attrs }) {
        return (
            <div className="profile-module idcard">
                <div className="idcard-image">
                    <Profilepic id={attrs.id} />
                </div>
                <div className="idcard-text row">
                    <div className="col col-names">
                        <div className="idcard-name">{attrs.name}</div>
                        <div className="idcard-flair">{attrs.flair}</div>
                        <div className="idcard-level">level {attrs.level}</div>
                    </div>
                    <div className="col idcard-links">
                        <a href={`/player/${attrs.id}`}>simple view</a>
                        <a href={getProfileLink(attrs)} target="_BLANK">view on Ubisoft</a>
                        <a href={getEslLink(attrs)} target="_BLANK">find on ESL</a>
                    </div>
                </div>
            </div>
        )
    }
}