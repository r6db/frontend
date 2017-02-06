import m from "mithril";
import Alias from "./Alias";
import "./aliases.scss";


export default {
    view: ({ attrs }) => (
        <div className="aliases">
            <div className="card-header">Aliases</div>
            <div className="card-content">{
                attrs.aliases.map((alias, i) => <Alias key={i} {...alias} />)
            }</div>
        </div>
    )
};