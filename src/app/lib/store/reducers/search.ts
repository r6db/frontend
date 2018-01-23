export default (state = "", action) => (action.type === "SEARCH" ? action.payload.query : state);
