// export default (state = "PC", action = {}) => {
//     return action.type === "SELECT_PLATFORM"
//         ? action.payload
//         : state;
// }

/**
 *
 */
export default (state = "PC", action = {}) => {
    const urlMap = {
        PC: "https://r6db.com",
        PS4: "https://ps4.r6db.com",
        XBOX: "https://xbox.r6db.com"
    }
    if (action.type === "SELECT_PLATFORM" && action.payload.toUpperCase() !== state) {
        window.location.href = urlMap[action.payload.toUpperCase()];
    }
    return action.type === "SELECT_PLATFORM"
        ? action.payload
        : state;
}