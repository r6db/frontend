import * as api from "lib/api";
import { event } from "lib/analytics";

export const init = (dispatch, getState) => {};

export const toPlayer = id => ({ type: "PLAYER", payload: { id } });
export const toPlayerTab = (id, tab) => ({ type: "PLAYERTABS", payload: { id, tab } });
export const toSimple = id => ({ type: "SIMPLE", payload: { id } });

export const toChanka = platform => ({ type: "CHANKABOARD", payload: { platform } });

export const favoritePlayer = id => ({ type: "FAV_PLAYER", payload: id });
export const unfavoritePlayer = id => ({ type: "UNFAV_PLAYER", payload: id })

export const updatePlayer = id => (dispatch, getState) => {
    const { platform } = getState();
    dispatch({ type: "LOADING", payload: "updating player data" });
    event("update", { id });
    api
        .getPlayer(id, { update: true, platform })
        .then(function(player) {
            dispatch({ type: "PLAYER_FETCHED", payload: { id, player } });
            dispatch({ type: "loading", payload: false });
        })
        .catch(error => {
            console.error(error);
            dispatch({ type: "PLAYER_FAILED", payload: { id, error } });
            dispatch({ type: "loading", payload: false });
        });
};

export const toSearch = query => (dispatch, getState) => {
    const { platform } = getState();
    dispatch({ type: "SEARCH", payload: { query, platform } });
};
