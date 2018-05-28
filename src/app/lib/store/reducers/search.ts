export default (state = "", action) =>
    action.type === "QUERY" ? action.payload : state;
