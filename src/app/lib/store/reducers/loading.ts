const LOADING_START_ACTIONS = [
    "SEARCH",
    "LEADERBOARD",
    "CHANKABOARD",
    "DETAIL",
    "PLAYER",
    "PROFILE",
    "COMPARISON"
];

const LOADING_END_ACTIONS = [
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
];

export default (state = false, action) => {
    if (LOADING_START_ACTIONS.includes(action.type)) {
        return true;
    }
    if (LOADING_END_ACTIONS.includes(action.type)) {
        return false;
    }
    return action.type === "LOADING" ? action.payload : state;
};
