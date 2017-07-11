import { getTweets } from "./api";
import * as constants from "./constants";

let redrawListeners = [];
let isNotifying = false;

export let appstate = {
    Component: "div",
    config: {},
    data: null,
    tweets: [],
    loading: false,
    search: ""
};


export const get = key =>  key ? appstate[key] : appstate;
export const set = (key, val) => {
    appstate = {
        ...appstate,
        [key]: val
    };
    notifyRedraw();
}
export const merge = obj => {
    appstate = Object.assign({}, appstate, obj);
    notifyRedraw();
}

export const onShouldRedraw = cb => redrawListeners.push(cb);
export const offShouldRedraw = cb => redrawListeners = redrawListeners.filter(x => x !== cb);

const notifyRedraw = () => {
    if (!isNotifying) {
        isNotifying = true;
        requestAnimationFrame(doNotify);
    }
}
const doNotify = () => {
    redrawListeners.forEach(cb => cb(appstate));
    isNotifying = false;
}



function updateTweets() {
    getTweets()
        .then(tweets => set("tweets", tweets))
        .then(() => {
            // nasty hack to fix safari not recalculating flex
            document.querySelector(".menu-center").style.minHeight = "1px";
        })
}
setInterval(updateTweets, 2 * 60 * 1000);
updateTweets();

export default appstate;