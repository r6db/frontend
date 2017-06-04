export const formatDuration = seconds => {
    const rawHours = seconds / (60 * 60);
    const hours = rawHours | 0;
    const minutes = ((rawHours % 1) * 60).toFixed(0);
    return `${hours}h ${minutes}m`;
}

export const getWinChance = (obj) => (obj.won * 100 / (obj.won + (obj.lost || 1) + (obj.abandons || 1))).toFixed(2) + "%"

export const getKillRatio = obj => (obj.kills / (obj.deaths || 1)).toFixed(2)

export const getKdaRatio = obj => (((obj.kills) + (obj.assists || 0)) / (obj.deaths || 1)).toFixed(2)