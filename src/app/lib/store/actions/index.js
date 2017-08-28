import * as api from "lib/api";

export const init = (dispatch, getState) => {
    api.getTweets()
        .then(payload => dispatch({ type: "TWEETS_FETCHED", payload }));
}