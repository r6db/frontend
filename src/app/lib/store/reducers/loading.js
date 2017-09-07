export default (state = false, action = {}) => {
    if (["SEARCH", "LEADERBOARD", "DETAIL", "PLAYER", "PROFILE"].includes(action.type)) {
        return true;
    }
    if (["SEARCH_FETCHED",
        "SEARCH_FAILED",
        "LEADERBOARD_FETCHED",
        "LEADERBOARD_FAILED",
        "PLAYER_FETCHED",
        "PLAYER_FAILED"].includes(action.type)) {
        return false;
    }
    return action.type === 'LOADING'
        ? action.payload
        : state;
}