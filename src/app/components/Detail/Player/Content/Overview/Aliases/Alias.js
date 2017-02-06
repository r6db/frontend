import m from "mithril";
import moment from "moment";
import memoize from "lib/memoize";
import  { DATE_SHORT } from "lib/constants";

const asDate = memoize(date => date ? moment(date).format(DATE_SHORT) : "no Date");

export default {
    view: memoize(({ attrs }) => (
        <div className="alias">
            <div className="alias-date">{asDate(attrs.created_at)}</div>
            <div className="alias-name">{attrs.name}</div>
        </div>
    ))
};