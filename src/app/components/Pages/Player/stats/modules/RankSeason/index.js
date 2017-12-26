import * as m from "mithril";
import Stat from "components/misc/Stat";
import * as get from "lodash/get";
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
                <div className="playermodule__header">{attrs.title}</div>
                <div className="row">
                    <div className="col">
                        <Stat label="wins">{get(attrs, "wins", 0)}</Stat>
                        <Stat label="losses">{get(attrs, "losses", 0)}</Stat>
                        <Stat label="abandons">{get(attrs, "abandons", 0)}</Stat>
                        <Stat label="win rate">{getRankWinChance(attrs)}</Stat>
                    </div>
                    <div className="col">
                        <Stat label="Rank">{Ranks[get(attrs, "rank", 0)]}</Stat>
                        <Stat label="max. Rank">{Ranks[get(attrs, "max_rank", 0)]}</Stat>
                        <Stat label="MMR">{get(attrs, "mmr", 0).toFixed(2)}</Stat>
                        <Stat label="Skill ± Uncertainty" tooltip="numerical value of your performance in ranked">
                            {get(attrs, "skill_mean", 0).toFixed(2)} ± {get(attrs, "skill_stdev", 0).toFixed(2)}
                        </Stat>
                    </div>
                </div>
            </div>
        );
    },
};

export default {
    view({ attrs }) {
        return (
            <div className="playermodule rankseason">
                <RankedSeason {...attrs.rank.emea} title="Europe, Africa & middle East" />
                <RankedSeason {...attrs.rank.ncsa} title="North, Central & South America" />
                <RankedSeason {...attrs.rank.apac} title="Asia & Pacific Area" />
            </div>
        );
    },
};
