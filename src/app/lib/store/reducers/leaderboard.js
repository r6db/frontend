export default (state = {}, action = {}) => {
    return action.type === "LEADERBOARD_FETCHED"
        ? {
            ...state,
            [action.payload.board]: action.payload.entries
        }
        : state;
}