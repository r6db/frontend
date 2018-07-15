interface IPlayerReducerState {
    [id: string]: any;
}
export default (state: IPlayerReducerState = {}, action) => {
    switch (action.type) {
        case "PLAYERS_FETCHED":
            const s = Object.assign({}, state);
            return action.payload.reduce((acc, curr) => {
                acc[curr.id] = curr.player;
                return acc;
            }, s);
        case "PLAYER_FETCHED":
            return Object.assign({}, state, {
                [action.payload.id]: action.payload.player
            });
        default:
            return state;
    }
};
