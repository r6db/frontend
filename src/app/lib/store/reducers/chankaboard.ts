export default (state = [], action) => {
    return action.type === "CHANKABOARD_FETCHED" ? action.payload.entries : state;
};
