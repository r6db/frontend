export default (state = {}, action = {}) => {
    return action.type === "SEARCH_FETCHED"
        ? {
            ...state,
            [action.payload.query]: action.payload.result
        }
        : state;
}