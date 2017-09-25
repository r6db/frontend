export default (state = {}, action = {}) => {
    switch (action.type) {
        case "PLAYERS_FETCHED":
            const s = Object.assign({}, state);
            return action.payload.reduce((acc, curr) => {
                acc[curr.id] = curr.player;
                return acc;
            }, s);
        case "PLAYER_FETCHED":
            return { ...state, [action.payload.id]: action.payload.player };
        default:
            return state;
    };
}

