interface ILeaderboardReducerState {
    [board: string]: any[];
}

export default (state: ILeaderboardReducerState = {}, action) => {
    return action.type === "LEADERBOARD_FETCHED"
        ? {
              ...state,
              [action.payload.board]: action.payload.entries,
          }
        : state;
};
