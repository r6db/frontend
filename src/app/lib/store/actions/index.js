import * as api from "lib/api";

export const init = (dispatch, getState) => {
    api.getTweets()
        .then(payload => dispatch({ type: "TWEETS_FETCHED", payload }));
}

export const toPlayer = id => ({ type: "PLAYER", payload: { id } });
export const toPlayerTab = (id, tab) => ({ type: "PLAYERTABS", payload: { id, tab } });
export const toProfile = id => ({ type: "PROFILE", payload: { id } });