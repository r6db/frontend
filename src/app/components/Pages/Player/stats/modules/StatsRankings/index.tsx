import * as React from "react";
import Stat from "components/misc/Stat";
import * as get from "lodash/get";
import { getRankWinChance } from "lib/stats";
import { RANKS } from "lib/constants";
import "./rankings.scss";

function RankedSeason(props) {
    if (!props || props.wins + props.losses + props.abandons === 0) {
        return null;
    }
    return (
        <div className="rankedseason">
            <div className="playermodule__header">{props.title}</div>
            <div className="row">
                <div className="col">
                    <Stat label="wins">{get(props, "wins", 0)}</Stat>
                    <Stat label="losses">{get(props, "losses", 0)}</Stat>
                    <Stat label="abandons">{get(props, "abandons", 0)}</Stat>
                    <Stat label="win rate">{getRankWinChance(props)}</Stat>
                </div>
                <div className="col">
                    <Stat label="Rank">{RANKS[get(props, "rank", 0)]}</Stat>
                    <Stat label="max. Rank">
                        {RANKS[get(props, "max_rank", 0)]}
                    </Stat>
                    <Stat label="MMR">{get(props, "mmr", 0).toFixed(2)}</Stat>
                    <Stat
                        label="Skill ± Uncertainty"
                        tooltip="numerical value of your performance in ranked"
                    >
                        {get(props, "skill_mean", 0).toFixed(2)} ±{" "}
                        {get(props, "skill_stdev", 0).toFixed(2)}
                    </Stat>
                </div>
            </div>
        </div>
    );
}

export default function StatsRankings(props) {
    // show placeholder card if we don't have ranks yet
    if (!props.rank || !props.rank.apac) {
        return <RankedSeason wins={0} title="Ranks not yet fetched" />;
    }
    return (
        <div className="playermodule rankedstats">
            <RankedSeason
                {...props.rank.emea}
                title="Europe, Africa & middle East"
            />
            <RankedSeason
                {...props.rank.ncsa}
                title="North, Central & South America"
            />
            <RankedSeason {...props.rank.apac} title="Asia & Pacific Area" />
        </div>
    );
}
