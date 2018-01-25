export default (state = false, action) => {
    if (["SEARCH", "LEADERBOARD", "DETAIL", "PLAYER", "PROFILE", "COMPARISON"].includes(action.type)) {
        return true;
    }
    if (
        [
            "SEARCH_FETCHED",
            "SEARCH_FAILED",
            "LEADERBOARD_FETCHED",
            "LEADERBOARD_FAILED",
            "CHANKABOARD_FETCHED",
            "CHANKABOARD_FAILED",
            "PLAYER_FETCHED",
            "PLAYER_FAILED",
            "PLAYERS_FETCHED",
            "PLAYERS_FAILED",
            "MAINTENANCE",
        ].includes(action.type)
    ) {
        return false;
    }
    return action.type === "LOADING" ? action.payload : state;
};
