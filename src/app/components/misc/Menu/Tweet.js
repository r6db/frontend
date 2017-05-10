import m from "mithril";
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
