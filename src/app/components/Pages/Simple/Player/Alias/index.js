import * as Inferno from "inferno";
import "./alias.scss";

const formatTitle = date => date
    ? (new Date(date)).toLocaleString()
    : "no Date";

export default {
    view: ({ attrs }) => (
        <div className="alias" >
            <div className="alias-time" title={formatTitle(attrs.alias.created_at)}>
                {
                    attrs.alias.created_at
                        ? (new Date(attrs.alias.created_at)).toLocaleDateString()
                        : "no Date"
                }
            </div>
            <div className="alias-name">{attrs.alias.name}</div>
        </div>
    )
};
