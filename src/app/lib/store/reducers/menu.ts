export default (state = false, action) => {
    switch (action.type) {
        case "MENU_TOGGLE":
            return !state;
        case "MENU_OPEN":
            return true;
        case "HOME":
        case "LEADERBOARD":
        case "SEARCH":
        case "PROFILE":
        case "PLAYER":
        case "FAQ":
        case "COMPARISON":
        case "FAVORITES":
        case "PRIVACY":
        case "SETTINGS":
        case "MENU_CLOSE":
            return false;
        default:
            return state;
    }
};
