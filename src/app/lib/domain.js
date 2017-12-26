export function getUbiLink(id, platform) {
    const platformShorthand = { PC: "uplay", PS4: "psn", XBOX: "xbl" }[platform];
    return `https://game-rainbow6.ubi.com/en-gb/${platformShorthand}/player-statistics/${id}/multiplayer`;
}

export function getEslLink(name) {
    return `https://play.eslgaming.com/search/?query=${name}&type=gameaccount`;
}
