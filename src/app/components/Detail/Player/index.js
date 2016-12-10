import m from "mithril";

import NotFound from "./NotFound";
import Profilepic from "../../misc/Profilepic";
import Alias from "./Alias";
import Placeholder from "../Placeholder";
import Playtime from "./modules/Playtime";
import Timedata from "./modules/Timedata";
import GeneralStats from "./modules/GeneralStats";
import RankedStats from "./modules/RankedStats";

import moment from "moment";
import { State } from "lib/constants";
import setMeta from "lib/meta";
import api from "lib/api";
import exitAnim from "lib/exitAnim";
import Log from "lib/log";
const log = Log.child(__filename);

const optional = (pred, cb) => pred ? cb() : null;

export default {
    player: m.prop(null),
    onbeforeremove: exitAnim,
    onremove: ({ state }) => {
        log.trace("<Player /> onremove");
        state.player(null);
    },
    oninit: ({ attrs, state }) => {
        log.trace("<Player /> oninit");
        log.trace("getting player data", attrs.store.get("detail"));
        api("getPlayer", { id: attrs.store.get("detail") })
            .then(function (res) {
                log.trace("got player", res);
                return res;
            })
            .then(state.player)
            .then(function () {
                setMeta(State.DETAIL, state.player().aliases[0].name);
                requestAnimationFrame(m.redraw);
                attrs.store.set("loading", false);
            })
            .catch(err => {
                log.error(err);
                attrs.store.set("loading", false);
            });
    },
    view: ({ attrs, state }) => attrs.store.get("loading")
        ? <Placeholder />
        : state.player()
            ? (<div className={`detail-player player-${state.player().id} is-${state.player().role || "user"}`}>
                <div className="detail-header">
                    <div className="detail-headerimage">
                        <Profilepic id={state.player().id} delay={0} />
                    </div>
                    <div className="detail-headertext">
                        <div className="detail-name">{state.player().aliases[0].name}</div>
                        <a href={`https://game-rainbow6.ubi.com/en-gb/uplay/player-statistics/${state.player().id}/multiplayer`}
                            className="detail-id"
                            title="show on uplay">
                            {state.player().id}
                        </a>
                    </div>
                </div>
                <div className="detail-content">
                    <div className="detail-info">
                        <div className="detail-aliases">
                            {state.player().aliases.map(x => <Alias alias={x} />)}
                        </div>
                    </div>
                    <div className="detail-stats">
                        <Timedata player={state.player()} />
                        <Playtime player={state.player()} />
                        <GeneralStats player={state.player()} />
                        <RankedStats player={state.player()} />
                    </div>
                </div>
            </div>)
            : <NotFound />
};
