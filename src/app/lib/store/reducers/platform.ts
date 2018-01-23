export default (state = "PC", action) => {
    return action.type === "PLATFORM" ? action.payload : state;
};
