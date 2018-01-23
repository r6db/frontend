const nameMap = {
    apac: "Asia",
    ncsa: "America",
    emea: "Europe"
};
export const regions = ["apac", "emea", "ncsa"];

export function getRegionName(reg) {
    return nameMap[reg];
}
