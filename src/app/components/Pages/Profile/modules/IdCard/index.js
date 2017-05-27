import * as m from "mithril";
import Profilepic from "components/misc/Profilepic";
import { isConsole, platformShorthand } from "lib/constants";
import "./idcard.scss";

const getProfileLink = profile => {
    const id = isConsole ? profile.userId : profile.id;
    return `https://game-rainbow6.ubi.com/en-gb/${platformShorthand}/player-statistics/${id}/multiplayer`
}
const getEslLink = name => `https://play.eslgaming.com/search/?query=${name}&type=gameaccount`

export default {
    view({ attrs }) {
        return (
            <div className="profile-module idcard">
                <div className="idcard-image">
                    <Profilepic id={attrs.id} />
                </div>
                <div className="idcard-text">
                    <div className="idcard-name">{attrs.name}</div>
                    <div className="idcard-id">{attrs.id}</div>
                    <div className="idcard-links">
                        <a href={`/player/${attrs.id}`} className="idcard-esl">simple view</a>
                        <a href={getProfileLink(attrs)} className="idcard-ubi">view on Ubisoft</a>
                        <a href={getEslLink(attrs.name)} className="idcard-esl">find on ESL</a>
                    </div>
                </div>
            </div>
        )
    }
}