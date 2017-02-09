import Cache from "./cache";

import findPlayerApi from "./methods/findPlayer";
import getPlayerApi from "./methods/getPlayer";
import getStatsApi from "./methods/getStats";
import getTweetsApi from "./methods/getTweets";
import getLeaderboardApi from "./methods/getLeaderboard";


const minutesToMs = min => 60 * 1000 * min;

const cachifyMethod = function (apiCall, cacheDuration) {
    const cache = new Cache(cacheDuration);
    return function (...params) {
        const cacheKey = JSON.stringify(params);
        const payload = cache.get(cacheKey);
        if (payload) {
            console.log("found item in cache");
            return Promise.resolve(payload);
        } else {
            return apiCall(...params)
                .then(function (res) {
                    cache.set(cacheKey, res);
                    return res;
                });
        }
    };
};

export const findPlayer = cachifyMethod(findPlayerApi, minutesToMs(15));
export const getPlayer = cachifyMethod(getPlayerApi, minutesToMs(60));
export const getStats = cachifyMethod(getStatsApi, minutesToMs(60 * 24));
export const getLeaderboard = cachifyMethod(getLeaderboardApi, minutesToMs(60));
export const getTweets = cachifyMethod(getTweetsApi, minutesToMs(2));