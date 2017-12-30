export default (state = 0, action = {}) => {
    if (["SEARCH", "LEADERBOARD", "DETAIL", "PLAYER", "PROFILE", "COMPARISON"].includes(action.type)) {
        return state +1;
    }
    if (
        [
            "SEARCH_FETCHED",
            "SEARCH_FAILED",
            "LEADERBOARD_FETCHED",
            "LEADERBOARD_FAILED",
            "PLAYER_FETCHED",
            "PLAYER_FAILED",
            "PLAYERS_FETCHED",
            "PLAYERS_FAILED",
        ].includes(action.type)
    ) {
        return Math.max(state - 1, 0) ;
    }
    return action.type === "LOADING" ? action.payload : state;
};
