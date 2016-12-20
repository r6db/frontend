import m from "mithril";
import store from "./store";
import Log from "lib/log";
import page from "page";
import { State } from "lib/constants";
import { parse } from "querystring";
import api from "lib/api";
const log = Log.child(__filename);
const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;

import Home from "components/Home";
import Search from "components/Search";
import Detail from "components/Detail";
import Leaderboard from "components/Leaderboard";

function analyticsMiddleware(context, next) {
    ga("set", "page", context.path);
    ga("send", "pageview");
    return next();
}

export default function initRoutes() {
    page("/", analyticsMiddleware, function (context) {
        if (context.pathname.slice(0, 10) === "/#/player/") {
            log.trace("got a legacy url");
            const id = context.pathname.slice(11).split(/[\/?#]/)[0];
            page.redirect("/player/" + id);
            return;
        }
        log.debug("router mount <Home />");
        store.merge({
            appstate: State.INITIAL,
            Component: Home,
            loading: false,
            data: null,
            search: {
                query: "",
                exact: false
            }
        });
        api("getStats")
            .then(function(res) {
                if(!res.usercount ||  !res.namecount) {
                    store.set("loading", false);
                } else {
                    store.merge({
                        loading: false,
                        data: res
                    });
                }
            })
            .catch(function(err) {
                console.warn(err);
            });

    });
    page("/search/:query", analyticsMiddleware, function (ctx) {
        log.debug("router mount <Search />");
        const qs = parse(ctx.querystring);
        const exact = qs.exact === "true" || qs.exact === "1";
        if (ctx.params.query && ctx.params.query.length > 2) {
            store.merge({
                appstate: State.SEARCH,
                Component: Search,
                loading: true,
                data: null,
                search: {
                    query: ctx.params.query,
                    exact
                }
            });
            api("findPlayer", { name: ctx.params.query, exact })
                .then(function(res) {
                    store.merge({
                        appstate: State.RESULT,
                        data: res,
                        loading: false
                    });
                })
                .catch(function(err) {
                    log.warn(err);
                });
        } else {
            page.redirect("/");
        }
    });
    page("/player/:id", analyticsMiddleware, function (ctx) {
        log.debug("router mount <Detail />");
        const id = ctx.params.id;
        store.merge({
            appstate: State.DETAIL,
            Component: Detail,
            loading: true,
            data: null
        });
        api("getPlayer", { id })
            .then(function (res) {
                if (res.id === id) {
                    store.merge({
                        data: res,
                        loading: false
                    });
                } else {
                    log.info("discarded data from previous route");
                }
            })
            .catch(function(err) {
                console.warn(err);
            });
    });
    page("/leaderboard", analyticsMiddleware, function (ctx) {
        const boards = {
            skill: "highest_skill_adjusted",
            mmr: "highest_mmr"
        };
        const qs = parse(ctx.querystring);
        const board = boards[qs.stat] || boards.skill;
        log.debug("router mount <Leaderboard />");
        store.merge({
            appstate: State.LEADERBOARD,
            Component: Leaderboard,
            loading: true,
            data: null
        });
        api("getLeaderboard", { board })
            .then(function (res) {
                store.merge({
                    data: res,
                    loading: false
                });
            })
            .catch(function(err) {
                console.warn(err);
            });
    });
    page("*", function (ctx) {
        if (ctx.path.startsWith("//")) {
            log.trace("trying to redirect path", ctx);
            page.redirect(ctx.path.substr(1));
        } else {
            log.warn("route not found", ctx);
            page.redirect("/");
        }
    });
    page.start();
}