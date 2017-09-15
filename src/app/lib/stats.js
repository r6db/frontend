export const formatDuration = seconds => {
    if (!seconds) {
        return "0h 0m";
    }
    const rawHours = seconds / (60 * 60);
    const hours = rawHours | 0;
    const minutes = ((rawHours % 1) * 60).toFixed(0);
    return `${hours}h ${minutes}m`;
}
export const formatDate = date => (new Date(date).toLocaleDateString());

export const getWinChanceRaw = (obj) => (obj.won || 0) / (((obj.won || 0) + (obj.lost || 0)) || 1);
export const getWinChance = (obj) => (getWinChanceRaw(obj) * 100).toFixed(2) + "%";

export const getKillRatioRaw = obj => obj.kills / (obj.deaths || 1);
export const getKillRatio = obj => getKillRatioRaw(obj).toFixed(2);

export const getKdaRatioRaw = obj => ((obj.kills) + (obj.assists || 0)) / (obj.deaths || 1);
export const getKdaRatio = obj => getKdaRatioRaw(obj).toFixed(2);

export const getRankWinChanceRaw = (obj) => obj.wins / ((obj.wins + obj.losses + obj.abandons) || 1);
export const getRankWinChance = (obj) => (getRankWinChanceRaw(obj) * 100).toFixed(2) + "%";
