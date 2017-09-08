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

export const getWinChanceRaw = (obj) => obj.won * 100 / ((obj.won + obj.lost) || 1);
export const getWinChance = (obj) => getWinChanceRaw(obj).toFixed(2) + "%";

export const getKillRatioRaw = obj => obj.kills / (obj.deaths || 1);
export const getKillRatio = obj => getKillRatioRaw(obj).toFixed(2);

export const getKdaRatopRaw = obj => ((obj.kills) + (obj.assists || 0)) / (obj.deaths || 1);
export const getKdaRatio = obj => getKdaRatopRaw(obj).toFixed(2);

export const getRankWinChanceRaw = (obj) => obj.wins * 100 / ((obj.wins + obj.losses + obj.abandons) || 1);
export const getRankWinChance = (obj) => getRankWinChanceRaw(obj).toFixed(2) + "%";