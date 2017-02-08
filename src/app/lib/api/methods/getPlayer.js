import moment from "moment";
import { v2Api, WeaponTypes, OperatorProps, OperatorNames, DATE_SHORT } from "lib/constants";
import { failEarly, getHeaders } from "../utils";

const fixAlias = alias => {
    // eslint-disable-next-line camelcase
    alias.created_at = alias.created_at
        ? new Date(alias.created_at)
        : null;
    return alias;
};

const getRankGames = x => x.wins + x.losses + x.abandons;
const getKdr = obj => obj.kills / (obj.deaths || 1);
const getWlr = obj => obj.won / (obj.won + obj.lost);
const getWlrRanked = obj => obj.wins / (obj.wins + obj.abandons + obj.losses);

const mapOperator = op => Object.keys(op)
    .reduce(function (acc, curr) {
        if (/operatorpve_/.test(curr)) {
            acc.gadgetPve = op[curr] ||  0;
        } else if (/operatorpvp_/.test(curr)) {
            acc.gadgetPvp = op[curr] ||  0;
        } else {
            acc[curr] = op[curr];
        }
        return acc;
    }, {});
const mapOperatorMap = map => Object.keys(map)
    .reduce(function (acc, curr) {
        acc[curr] = mapOperator(map[curr]);
        return acc;
    }, {});


const mapWeaponMap = weaponMap => Object.keys(WeaponTypes)
    .reduce(function (acc, type) {
        const val = { label: WeaponTypes[type].label };
        Object.keys(weaponMap)
            .map(key => val[key] = weaponMap[key][type]);

        acc[type] = val;
        return acc;
    }, {});

const getPlayer = id => fetch(`${v2Api}/players/${id}/extended`, { headers: getHeaders() })
    .then(failEarly)
    .then(res => res.json());


/**
 * map the server response to our desired format
 */

const handleResponse = res => {
    const player = {
        id: res.id,
        level: res.level,
        createdAt: res.created_at,
        flags: {
            inactive: false,
            noAliases: false,
            noPlaytime: false,
            noSeasonRanks: false,
            noRank: false,
        }
    };


    // playtime stuff
    if (!res.lastPlayed || (!res.lastPlayed.casual && !res.lastPlayed.ranked)) {
        player.flags.noPlaytime = true;
    } else {
        // players inactive for more than a month are marked inactive
        const inactiveThreshold = moment()
            .subtract(1, "month")
            .toDate();
        const lastActive = new Date(res.lastPlayed.last_played);
        if (lastActive < inactiveThreshold) {
            player.flags.inactive = true;
        }

        player.playtime = {
            casual: res.lastPlayed.casual,
            ranked: res.lastPlayed.ranked
        };
        player.lastPlayed = res.lastPlayed.last_played;
    }

    // rank stuff
    player.flags.noNcsa = !res.rank || res.rank.ncsa.rank === 0;
    player.flags.noApac = !res.rank || res.rank.apac.rank === 0;
    player.flags.noEmea = !res.rank || res.rank.emea.rank === 0;
    player.flags.noRank = player.flags.noNcsa && player.flags.noApac && player.flags.noEmea;

    if (res.rank) {
        // we give all ranks a label, so we map them to region labels
        res.rank.emea.label = "emea";
        res.rank.ncsa.label = "ncsa";
        res.rank.apac.label = "apac";

        player.rank = res.rank
            ? [res.rank.emea, res.rank.ncsa, res.rank.apac]
                .reduce((acc, region) => {
                    acc[region.label.toLowerCase()] = Object.assign({}, region, {
                        games: region.wins + region.losses + region.abandons,
                        wlr: region.wins / (region.wins + region.losses + region.abandons),
                    });
                    return acc;
                }, {})
            : {};
                
        player.regionByGameCount = Object.values(player.rank)
            .sort((a, b) => b.games - a.games)
            .map(x => x.label);

    }
    if (res.seasonRanks) {
        player.pastRanks = res.seasonRanks
            .concat(player.rank)
            .map(x => [x.ncsa, x.emea, x.apac]
                .map(y => ({ rank: y.rank, season: x.season }))
                .sort((a, b) => b.rank - a.rank)[0]);
    } else {
        player.flags.noSeasonRanks = true;
    }



    // aliases and naming stuff
    if (!res.aliases) {
        player.flags.noAliases = true;
    } else {
        player.aliases = res.aliases
            .map(fixAlias)
            .sort((a, b) => b.created_at - a.created_at);
        player.name = player.aliases[0].name;
    }


    player.stats = {
        general: res.stats.general,
        gameModes: {
            bomb: res.stats.bomb,
            secure: res.stats.secure,
            hostage: res.stats.hostage
        },
        matchmaking: {
            casual: res.stats.casual,
            ranked: res.stats.ranked
        },
        operators: mapOperatorMap(res.stats.operator),
        weapons: mapWeaponMap(res.stats.weapon)
    };
    if(player.stats.general) {
        const { bulletsFired, bulletsHit, headshot, kills } = player.stats.general;
        player.stats.general.accuracy = bulletsHit / bulletsFired;
        player.stats.general.hsr = headshot / kills;
    }
    if(player.stats.matchmaking.ranked) {
        player.stats.matchmaking.ranked.wlr = getWlr(player.stats.matchmaking.ranked);
        player.stats.matchmaking.ranked.kdr = getKdr(player.stats.matchmaking.ranked);
    }
    if (player.stats.matchmaking.casual) {
        player.stats.matchmaking.casual.wlr = getWlr(player.stats.matchmaking.casual);
        player.stats.matchmaking.casual.kdr = getKdr(player.stats.matchmaking.casual);
    }

    // timeline stuff
    if (res.dailyStats) {

        const diffProperty = (prop, a, b) => typeof prop === "function"
            ? prop(a) - prop(b)
            : a[prop] - b[prop];
        
        // get delta of all useful props
        const compareOpByName = (originalOps, comparisonOps) => key => {
            const original = originalOps[key];
            // its possible that an op didn't exist yesterday, so replace him with an empty shell
            const comparison = comparisonOps[key] || {};
            const stub = { name: OperatorNames[key] };
            
            return OperatorProps.reduce((acc, curr) => ({
                ...acc,
                [curr]: original[curr] - (comparison[curr] || 0)
            }), stub);
        };
        
        /**
         * we iterate through all but the last element and compare to the 'next' 
         */
        const dailyS = res.dailyStats
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const filteredDailyS = dailyS
            .filter((x, i, a) => a[i + 1]
                ? diffProperty("timePlayed", x.general, dailyS[i + 1].general) > 0
                : true);
        
        player.timeline = filteredDailyS.slice(0, -1)
            .map((current, i) => {
                // get yesterdays stats
                const last = filteredDailyS[i + 1];
                return {
                    date: moment(current.created_at).format(DATE_SHORT),
                    timePlayed: diffProperty("timePlayed", current.general, last.general),
                    won: diffProperty("won", current.general, last.general),
                    lost: diffProperty("lost", current.general, last.general),
                    kills: diffProperty("kills", current.general, last.general),
                    deaths: diffProperty("deaths", current.general, last.general),
                    kdr: (diffProperty("kills", current.general, last.general) /
                        diffProperty("deaths", current.general, last.general)),
                    operator: Object.keys(current.operator)
                        .map(compareOpByName(current.operator, last.operator))
                        .filter(x => x.timePlayed)
                        .sort((a, b) => b.timePlayed - a.timePlayed)
                        .slice(0, 5),
                    matchmaking: {
                        ranked: diffProperty("timePlayed", current.ranked, last.ranked),
                        casual: diffProperty("timePlayed", current.casual, last.casual)
                    },
                    modes: {
                        bomb: diffProperty("played", current.bomb, last.bomb),
                        secure: diffProperty("played", current.secure, last.secure),
                        hostage: diffProperty("played", current.hostage, last.hostage),
                    }
                };
            });
            // only show the ones where the player played for longer than 15 minutes
            
    }

    return player;
};

export default function (id) {
    return getPlayer(id)
        .then(handleResponse);
}
