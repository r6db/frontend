export default (state = {}, action = {}) => {
    return action.type === "PLAYER_FETCHED"
        ? {
            ...state,
            [action.payload.id]: action.payload.player
        }
        : state;
}