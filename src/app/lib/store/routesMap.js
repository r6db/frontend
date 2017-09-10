import { redirect, push, NOT_FOUND } from "redux-first-router";
import { Leaderboards } from "lib/constants";
import * as api from "../api";
import setMeta from "lib/meta";
import * as tracker from "lib/tracker";


export default {
    HOME: "/",
    SEARCH: {
        path: "/search/:platform/:query",
        thunk: async (dispatch, getState) => {
            tracker.trackPageView("search");
            const { location } = getState();
            const { query, platform } = location.payload;
            dispatch({ type: "PLATFORM", payload: platform });
            api.findPlayer(query, platform)
                .then(result => {
                    tracker.trackSiteSearch(query, platform, result.length);
                    setMeta({
                        title: `Search ${platform} for ${query}`,
                        description: `Find ${query} in the community database for Rainbow Six: Siege`
                    });
                    dispatch({ type: "SEARCH_FETCHED", payload: { query, platform, result } });
                })
                .catch(error => {
                    dispatch({ type: "SEARCH_FAILED", payload: { query, error } });
                });
        }
    },
    LEADERBOARD_ENTRY: {
        path: "/leaderboard",
        thunk: async (dispatch, getState) => {
            dispatch(redirect({ type: "LEADERBOARD", payload: { board: "ALL" } }));
        }
    },
    CHANKABOARD: {
        path: "/leaderboard/:platform/CHANKA",
        thunk: async (dispatch, getState) => {
            const { platform } = getState().location.payload;
            tracker.trackPageView("search");
            tracker.trackEvent("leaderboard", "view", "board", "chanka");
            dispatch({ type: "PLATFORM", payload: platform });
            api.getLeaderboard("operatorpvp_tachanka_turretkill", platform)
                .then(entries => {
                    setMeta({
                        title: "LMG kills leaderboard",
                        description: "top 100 Tachanka players in our database",
                        type: "website"
                    });
                    dispatch({ type: "LEADERBOARD_FETCHED", payload: { board: "CHANKA", entries } })
                })
                .catch(error => dispatch({ type: "LEADERBOARD_FAILED", payload: { board: "CHANKA", error } }));
        }
    },
    LEADERBOARD: {
        path: "/leaderboard/:platform/:board",
        thunk: async (dispatch, getState) => {
            const { board: b, platform } = getState().location.payload;
            const board = b.toUpperCase();
            if (board === "CHANKA") { return; }
            tracker.trackPageView("search");
            tracker.trackEvent("leaderboard", "view", "board", board);
            const lbConfig = Leaderboards[board];
            dispatch({ type: "PLATFORM", payload: platform });
            api.getLeaderboard(lbConfig.board, platform)
                .then(entries => {
                    setMeta({
                        title: `${lbConfig.label} leaderboard`,
                        description: `find the top 100 players (${lbConfig.label}) in our Database`,
                        type: "website"
                    });
                    dispatch({ type: "LEADERBOARD_FETCHED", payload: { board, entries } })
                })
                .catch(error => dispatch({ type: "LEADERBOARD_FAILED", payload: { board, error } }));
        }
    },
    FAQ: {
        path: "/faq",
        thunk: (dispatch, getState) => {
            tracker.trackPageView("faq");
        }
    },
    PROFILE: {
        path: "/profile/:id",
        thunk: async (dispatch, getState) => {
            const { id } = getState().location.payload;
            api.getPlayer(id)
                .then(function (player) {
                    dispatch({ type: "PLAYER_FETCHED", payload: { id, player } });
                    tracker.trackPageView("profile");
                    tracker.trackEvent("profile", "view", "id", id);
                    if (player.flags.noAliases === false) {
                        setMeta({
                            title: `${player.name}`,
                            description: `${player.name} player profile for Rainbow Six: Siege`,
                            type: "profile"
                        });
                     } else {
                         setMeta({
                             title: `account ${id}`,
                             description: `${id} account details in the community database for Rainbow Six: Siege`
                         });
                     }
                })
                .catch(error => {
                    console.error(error);
                    dispatch({ type: "PLAYER_FAILED", payload: { id, error } })
                });
        }
    },
    PLAYER: {
        path: "/player/:id",
        thunk: playerThunk,
    },
    PLAYERTABS: {
        path: "/player/:id/:tab",
        thunk: playerThunk
    }
}


async function playerThunk(dispatch, getState) {
    const { id, tab } = getState().location.payload;
    api.getPlayer(id)
        .then(function (player) {
            dispatch({ type: "PLAYER_FETCHED", payload: { id, player } });
            tracker.trackPageView("player");
            tracker.trackEvent("player", "view", "id", id);
            tracker.trackEvent("player", "tab", "tab", tab || "stats");
            if (player.flags.noAliases === false) {
                setMeta({
                    title: `${player.name}`,
                    type: "profile"
                });
            } else {
                setMeta({
                    title: `account ${id}`,
                    description: `${id} account details in the community database for Rainbow Six: Siege`
                });
            }
        })
        .catch(error => {
            console.error(error);
            dispatch({ type: "PLAYER_FAILED", payload: { id, error } })
        });
}