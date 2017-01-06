import m from "mithril";
import { maxBy, assign } from "lodash";
import Player from "./Player";
import Placeholder from "./Placeholder";
import NotFound from "./Errors/NotFound";
import NoPlaytime from "./Errors/NoPlaytime";
import NoAliases from "./Errors/NoAliases";
import "./detail.scss";
import Log from "lib/log";
const log = Log.child(__filename);

const either = (pred, a, b) => pred ? a() : b();

export default {
    onremove({ state }) {
        log.trace("<Detail /> onremove");
    },
    oninit({ attrs, state }) {
        log.trace("<Detail /> oninit");
    },
    view({ attrs, state }) {
        if (attrs.loading) {
            return <Placeholder />;
        } else if (!attrs.data || !attrs.data.id) {
            return <NotFound />;
        } else if (attrs.data.flags && attrs.data.flags.noPlaytime) {
            return <NoPlaytime {...attrs.data} />;
        } else if (attrs.data.flags && attrs.data.flags.noAliases) {
            return <NoAliases {...attrs.data} />;
        } else {
            let pastRanks = attrs.data.seasonRanks
                .concat(attrs.data.rank)
                .map(x => {
                    return maxBy([x.ncsa, x.emea, x.apac]
                        .map(y => ({ rank: y.rank, season: x.season})), 'rank');
                });
            const data = assign({}, attrs.data, { pastRanks })
            return <Player {...data} />;
        }
    }
};
