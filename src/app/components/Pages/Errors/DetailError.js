import * as m from "mithril";
import Media from "components/misc/Media";
export default {
    view({ attrs, children }) {
        return <Media title={attrs.title}>{children}</Media>;
    },
};
