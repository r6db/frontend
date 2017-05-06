import m from "mithril";
import moment from "moment";
import { DATE_SHORT } from "lib/constants";
import "./tweet.scss";

export default {
    view: ({ attrs }) => (
        <div className="tweet">
        	<a href={attrs.url}>
            	<div className="tweet-date">{attrs.time}</div>
            </a>
        	<div className="tweet-text">{m.trust(attrs.html)}</div>
        </div>
    )
};
