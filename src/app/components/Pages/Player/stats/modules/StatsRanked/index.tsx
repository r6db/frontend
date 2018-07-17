import * as React from "react";
import { FormattedMessage } from "react-intl";
import Stat from "components/misc/Stat";
import * as get from "lodash/get";
import { formatDuration, getWinChance, getKillRatio } from "lib/stats";

import "./ranked.scss";

export default function StatsRanked(props) {
    return (
        <div className="playermodule statsranked">
            <div className="playermodule__header">
                <div className="playermodule__title">
                    <FormattedMessage id="player/ranked" />
                </div>
                <div className="playermodule__subtitle">
                    <FormattedMessage
                        id="player/matches"
                        values={{
                            number: get(props, "stats.ranked.played", 0)
                        }}
                    />
                </div>
            </div>
            <div className="playermodule__divider" />
            <div className="playermodule__content">
                <Stat label={<FormattedMessage id="wins" />}>{get(props, "stats.ranked.won", 0)}</Stat>
                <Stat label={<FormattedMessage id="losses" />}>{get(props, "stats.ranked.lost", 0)}</Stat>
                <Stat label={<FormattedMessage id="winRate" />}>{getWinChance(props.stats.ranked)}</Stat>
                <Stat label={<FormattedMessage id="kills" />}>{get(props, "stats.ranked.kills", 0)}</Stat>
                <Stat label={<FormattedMessage id="deaths" />}>{get(props, "stats.ranked.deaths", 0)}</Stat>
                <Stat label={<FormattedMessage id="kdRatio" />}>{getKillRatio(props.stats.ranked)}</Stat>
                <Stat label={<FormattedMessage id="timePlayed" />}>
                    {formatDuration(get(props, "stats.ranked.timePlayed", 0))}
                </Stat>
            </div>
        </div>
    );
}
