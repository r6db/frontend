const initialSettings = {
    analytics: false,
    season: "all time"
};

export default function settingsReducer(state = initialSettings, action) {
    switch (action.type) {
        case "CHANGE_SETTING":
            return { ...state, [action.payload.setting]: action.payload.value };
        case "TIMEFRAME":
            return { ...state, season: action.payload };
        default:
            return state;
    }
}
