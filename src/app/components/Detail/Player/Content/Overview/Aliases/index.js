import m from "mithril";
import Alias from "./Alias";
import "./aliases.scss";


export default {
    view: ({ attrs }) => (
        <div className="aliases">{
            attrs.aliases.map((alias, i) => <Alias key={i} {...alias}/>)
        }</div>
    )
};