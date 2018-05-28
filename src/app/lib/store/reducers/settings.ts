const initialSettings = {
    analytics: false
};

export default function settingsReducer(state = initialSettings, action) {
    switch (action.type) {
        case "CHANGE_SETTING":
            return { ...state, [action.payload.setting]: action.payload.value };
        default:
            return state;
    }
}
