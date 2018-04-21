export default function(state = [], action) {
    switch(action.type) {
        case "FAV_PLAYER":
            return state.indexOf(action.payload) === -1
                ? state.concat(action.payload)
                : state;
        case "UNFAV_PLAYER":
            return state.filter(x => x !== action.payload);
        default:
            return state;
    }
}
