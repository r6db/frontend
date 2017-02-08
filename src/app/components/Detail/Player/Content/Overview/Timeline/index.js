import m from "mithril";
import Entry from "./TimelineEntry";

import "./timeline.scss";

export default {
    view({ attrs }) {
        return (
            <div className={attrs.className || ""}>{
                attrs.timeline.map(x => <Entry key={x.date} {...x}/>)
            }</div>
        );
    }
};