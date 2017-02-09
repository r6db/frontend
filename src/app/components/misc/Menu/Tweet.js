import m from "mithril";
import moment from "moment";
import { DATE_SHORT } from "lib/constants";
import "./tweet.scss";

export default {
    view: ({ attrs }) => (
        <div className="tweet">
            <div className="tweet-date">{attrs.time}</div>    
            <div className="tweet-text">{m.trust(attrs.html)}</div>
        </div>
    )
};