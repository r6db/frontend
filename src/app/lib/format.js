// format number
export const fmtN = (i, p = 2) => Number.parseFloat(i).toFixed(p);

// format duration
export const fmtD = sec => {
    const rawM = (sec/60) | 0;
    const hours = (rawM/60) | 0;
    const min = rawM%60;
    return `${hours}h ${min}m`;
};