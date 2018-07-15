import Cache from "./cache";

import findPlayerApi from "./methods/findPlayer";
import getPlayerApi from "./methods/getPlayer";
import getPlayersApi from "./methods/getPlayers";
import getLeaderboardApi from "./methods/getLeaderboard";
import getCommunityRanksApi from "./methods/getCommunityRanks";

const minutesToMs = min => 60 * 1000 * min;

const cachifyMethod = function(apiCall, cacheDuration) {
    const cache = Cache(cacheDuration);
    return function(...params) {
        const cacheKey = JSON.stringify(params);
        const payload = cache.get(cacheKey);
        if (payload) {
            return Promise.resolve(payload);
        } else {
            return apiCall(...params).then(function(res) {
                cache.set(cacheKey, res);
                return res;
            });
        }
    };
};

export const findPlayer: typeof findPlayerApi = cachifyMethod(findPlayerApi, minutesToMs(15));
export const getPlayer: typeof getPlayerApi = cachifyMethod(getPlayerApi, minutesToMs(15));
export const getPlayers: typeof getPlayersApi = cachifyMethod(getPlayersApi, minutesToMs(15));
export const getLeaderboard: typeof getLeaderboardApi = cachifyMethod(getLeaderboardApi, minutesToMs(60));
export const getCommunityRanks: typeof getCommunityRanksApi = cachifyMethod(getCommunityRanksApi, minutesToMs(3600));
