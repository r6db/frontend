export default (state = [], action = {}) => {
    return action.type === 'TWEETS_FETCHED'
        ? action.payload
        : state;
}