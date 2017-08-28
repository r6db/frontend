export default (state = "", action = {}) => {
    return action.type === "SEARCH"
        ? action.payload.query
        : state;
}