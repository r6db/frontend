import * as React from "react";
import { FormattedMessage } from "react-intl";
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
            <div className="playermodule__header">
                <div className="playermodule__title">{props.title}</div>
            </div>
            <div className="playermodule__divider" />
            <div className="playermodule__content">
                <div className="row">
                    <div className="col">
                        <Stat label={<FormattedMessage id="wins" />}>{get(props, "wins", 0)}</Stat>
                        <Stat label={<FormattedMessage id="losses" />}>{get(props, "losses", 0)}</Stat>
                        <Stat label={<FormattedMessage id="abandons" />}>{get(props, "abandons", 0)}</Stat>
                        <Stat label={<FormattedMessage id="winRate" />}>{getRankWinChance(props)}</Stat>
                    </div>
                    <div className="col">
                        <Stat label={<FormattedMessage id="rank" />}>{RANKS[get(props, "rank", 0)]}</Stat>
                        <Stat label={<FormattedMessage id="maxRank" />}>{RANKS[get(props, "max_rank", 0)]}</Stat>
                        <Stat label={<FormattedMessage id="mmr" />}>{get(props, "mmr", 0).toFixed(2)}</Stat>
                        <Stat label={<FormattedMessage id="skillUncertainty" />}>
                            {get(props, "skill_mean", 0).toFixed(2)} ± {get(props, "skill_stdev", 0).toFixed(2)}
                        </Stat>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function StatsRankings(props) {
    if (
        !props.rank ||
        (props.rank.emea.wins + props.rank.emea.losses + props.rank.emea.abandons === 0) &&
        (props.rank.ncsa.wins + props.rank.ncsa.losses + props.rank.ncsa.abandons === 0) &&
        (props.rank.apac.wins + props.rank.apac.losses + props.rank.apac.abandons === 0)
    ) {
        return null;
    }
    return (
        <div className="playermodule rankedstats">
            <RankedSeason {...props.rank.emea} title={<FormattedMessage id="emea/long" />} />
            <RankedSeason {...props.rank.ncsa} title={<FormattedMessage id="ncsa/long" />} />
            <RankedSeason {...props.rank.apac} title={<FormattedMessage id="apac/long" />} />
        </div>
    );
}
