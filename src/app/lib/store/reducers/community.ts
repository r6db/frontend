interface ICommunityStats {
    stats: any;
    ranks: any;
}
export default (state: ICommunityStats = { stats: null, ranks: null }, action) => {
    switch (action.type) {
        case "COMMUNITYRANKS_FETCHED":
            return {
                ...state,
                ranks: action.payload,
            };
        case "COMMUNITYSTATS_FETCHED":
            return {
                ...state,
                stats: action.payload,
            };
        default:
            return state;
    }
};
