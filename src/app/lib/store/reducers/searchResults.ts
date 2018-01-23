interface ISearchresultState {
    [query: string]: any;
}
export default (state: ISearchresultState = {}, action) => {
    return action.type === "SEARCH_FETCHED"
        ? {
              ...state,
              [action.payload.query]: action.payload.result,
          }
        : state;
};
