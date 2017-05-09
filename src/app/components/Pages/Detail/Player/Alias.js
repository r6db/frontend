import m from "mithril";
import moment from "moment";

const formatTitle = date => date
    ? (new Date(date)).toLocaleString()
    : "no Date";

export default {
    view: ({ attrs }) => (
        <div className="alias" >
            <div className="alias-time" title={formatTitle(attrs.alias.created_at)}>
                {
                    attrs.alias.created_at
                        ? moment(attrs.alias.created_at).format("DD. MMM YYYY")
                        : "no Date"
                }
            </div>
            <div className="alias-name">{attrs.alias.name}</div>
        </div>
    )
};
