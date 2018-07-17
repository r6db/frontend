import * as React from "react";
import { FormattedMessage } from "react-intl";
import Stat from "components/misc/Stat";
import * as get from "lodash/get";
import { formatDuration, getWinChance, getKillRatio } from "lib/stats";

import "./casual.scss";

export default function StatsCasual(props) {
    return (
        <div className="playermodule statscasual">
            <div className="playermodule__header">
                <div className="playermodule__title">
                    <FormattedMessage id="player/casual" />
                </div>
                <div className="playermodule__subtitle">
                    <FormattedMessage
                        id="player/matches"
                        values={{
                            number: get(props, "stats.casual.played", 0)
                        }}
                    />
                </div>
            </div>
            <div className="playermodule__divider" />
            <div className="playermodule__content">
                <Stat label={<FormattedMessage id="wins" />}>{get(props, "stats.casual.won", 0)}</Stat>
                <Stat label={<FormattedMessage id="losses" />}>{get(props, "stats.casual.lost", 0)}</Stat>
                <Stat label={<FormattedMessage id="winRate" />}>{getWinChance(props.stats.casual)}</Stat>
                <Stat label={<FormattedMessage id="kills" />}>{get(props, "stats.casual.kills", 0)}</Stat>
                <Stat label={<FormattedMessage id="deaths" />}>{get(props, "stats.casual.deaths", 0)}</Stat>
                <Stat label={<FormattedMessage id="kdRatio" />}>{getKillRatio(props.stats.casual)}</Stat>
                <Stat label={<FormattedMessage id="timePlayed" />}>
                    {formatDuration(get(props, "stats.casual.timePlayed", 0))}
                </Stat>
            </div>
        </div>
    );
}
