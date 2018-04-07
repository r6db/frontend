interface ILeaderboardReducerState {
    [board: string]: any[];
}

export default (state: ILeaderboardReducerState = {}, action) => {
    return action.type === "LEADERBOARD_FETCHED"
        ? Object.assign({}, state, {
              [action.payload.board]: action.payload.entries,
          })
        : state;
};
