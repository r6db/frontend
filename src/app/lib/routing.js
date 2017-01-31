import m from "mithril";
import store from "./store";
import Log from "lib/log";
import page from "page";
import { Pageconfig, Regions } from "lib/constants";
import { parse } from "querystring";
import * as api from "lib/api";
import setMeta from "lib/meta";

const log = Log.child(__filename);
const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;

import Home from "components/Home";
import Search from "components/Search";
import Detail from "components/Detail";
import Leaderboard from "components/Leaderboard";
import Chankaboard from "components/Chankaboard";

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
            config: Pageconfig.INITIAL,
            Component: Home,
            loading: false,
            data: null,
            search: {
                query: "",
                exact: false
            }
        });
        setMeta();
    });
    page("/search", analyticsMiddleware, function (ctx) {
        log.debug("router mount <Search /> no query");
        store.merge({
            config: Pageconfig.SEARCH,
            Component: Search,
            loading: false,
            data: [],
            data: null,
            search: {
                query: "",
                exact: false
            }
        });
        setMeta({
            title: `Search`,
            description: `Find players in the community database for Rainbow Six: Siege (PC)`
        });
    });
    page("/search/:query", analyticsMiddleware, function (ctx) {
        log.debug("router mount <Search />");
        const qs = parse(ctx.querystring);
        const exact = qs.exact === "true" || qs.exact === "1";
        if (ctx.params.query && ctx.params.query.length > 2) {
            store.merge({
                config: Pageconfig.SEARCH,
                Component: Search,
                loading: true,
                data: null,
                search: {
                    query: ctx.params.query,
                    exact
                }
            });
            api.findPlayer(ctx.params.query, exact)
                .then(function(res) {
                    store.merge({
                        config: Pageconfig.RESULT,
                        data: res,
                        loading: false
                    });
                    setMeta({
                        title: `Search for ${ctx.params.query}`,
                        description: `Find ${ctx.params.query} in the community database for Rainbow Six: Siege (PC)`
                    });
                })
                .catch(function(err) {
                    log.warn(err);
                    setMeta();
                });
        } else {
            page.redirect("/");
        }
    });
    page("/player/:id", analyticsMiddleware, function (ctx) {
        log.debug("router mount <Detail />");
        const id = ctx.params.id;
        store.merge({
            config: Pageconfig.DETAIL,
            Component: Detail,
            loading: true,
            data: null
        });
        api.getPlayer(id)
            .then(function (res) {
                if (res.id === id) {
                    store.merge({
                        data: res,
                        loading: false
                    });
                    if (res.flags.noAliases === false) {
                        setMeta({
                            title: `${res.name}`,
                            description: `${res.name} player profile for Rainbow Six: Siege (PC)`,
                            image: `http://uplay-avatars.s3.amazonaws.com/${res.id}/default_146_146.png`,
                            type: "profile"
                        });
                    } else {
                        setMeta({
                            title: `account ${id}`,
                            description: `${id} account details in the community database for Rainbow Six: Siege (PC)`
                        });
                    }
                    
                } else {
                    log.info("discarded data from previous route");
                }
            })
            .catch(function(err) {
                console.warn(err);
                setMeta();
            });
    });
    page("/leaderboard/", function () {
        page.redirect("/leaderboard/ALL");
    });
    page("/leaderboard/chanka", analyticsMiddleware, function () {
        const board = "operatorpvp_tachanka_turretkill";
        const boardLabel = "Chanka, Chanka Chanka, CHANKAAAA";
        log.debug("router mount <Chankaboard />");
        store.merge({
            config: Pageconfig.CHANKABOARD,
            Component: Chankaboard,
            loading: true,
            data: null
        });
        api.getLeaderboard(board)
            .then(function (res) {
                store.merge({
                    data: {
                        board,
                        entries: res
                    },
                    loading: false
                });
                setMeta({
                    title: "LMG kills leaderboard",
                    description: "top 100 Tachanka players in our database",
                    type: "website"
                });
            })
            .catch(function (err) {
                console.warn(err);
                setMeta();
            });
    });
    page("/leaderboard/:board", analyticsMiddleware, function (ctx) {
        const lb = Regions[ctx.params.board] || Regions.ALL;
        log.debug("router mount <Leaderboard />");
        store.merge({
            config: Pageconfig.LEADERBOARD,
            Component: Leaderboard,
            loading: true,
            data: null
        });
        api.getLeaderboard(lb.board)
            .then(function (res) {
                store.merge({
                    data: {
                        board: ctx.params.board,
                        entries: res
                    },
                    loading: false
                });
                setMeta({
                    title: `${lb.label} leaderboard`,
                    description: `find the top 100 players (${lb.label}) in our Database`,
                    type: "website"
                });
            })
            .catch(function(err) {
                console.warn(err);
                setMeta();
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