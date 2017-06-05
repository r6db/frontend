import * as m from "mithril";
import Stat from "components/misc/Stat";
import { getRankWinChance } from "lib/stats";
import { Ranks } from "lib/constants";
import "./rankseason.scss";

const RankedSeason = {
    view({ attrs }) {
        if (!attrs || attrs.wins + attrs.losses + attrs.abandons === 0) {
            return null;
        }
        return (
            <div className="rankedseason">
                <div className="profile-module-header">{attrs.title}</div>
                <div className="row">
                    <div className="col">
                        <Stat label="wins">{attrs.wins}</Stat>
                        <Stat label="losses">{attrs.losses}</Stat>
                        <Stat label="abandons">{attrs.abandons}</Stat>
                        <Stat label="win rate">{getRankWinChance(attrs)}</Stat>
                    </div>
                    <div className="col">
                        <Stat label="Rank">{Ranks[attrs.rank]}</Stat>
                        <Stat label="max. Rank">{Ranks[attrs.max_rank]}</Stat>
                        <Stat label="MMR">{attrs.mmr.toFixed(2)}</Stat>
                        <Stat label="Skill ± Uncertainty" tooltip="numerical value of your performance in ranked">{attrs.skill_mean.toFixed(2)} ± {attrs.skill_stdev.toFixed(2)}</Stat>
                    </div>
                </div>
            </div>
        );
    }
}

export default {
    view({ attrs }) {
        return (
            <div className="profile-module rankseason">
                <RankedSeason {...attrs.rank.emea} title="Europe, Africa & middle East"/>
                <RankedSeason {...attrs.rank.ncsa} title="North, Central & South America"/>
                <RankedSeason {...attrs.rank.apac} title="Asia & Pacific Area"/>
            </div>
        );
    }
}