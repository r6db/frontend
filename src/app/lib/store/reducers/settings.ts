const initialSettings = {
    analytics: false,
    season: -1
};

export default function settingsReducer(state = initialSettings, action) {
    switch (action.type) {
        case "CHANGE_SETTING":
            return { ...state, [action.payload.setting]: action.payload.value };
        case "TIMEFRAME":
            return { ...state, season: Number.parseInt(action.payload) };
        default:
            return state;
    }
}
