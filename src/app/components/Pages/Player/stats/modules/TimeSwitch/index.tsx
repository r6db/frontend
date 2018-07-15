import * as React from "react";
import { FormattedMessage } from "react-intl";
import Stat from "components/misc/Stat";
import * as get from "lodash/get";
import Dropdown from "components/misc/Dropdown";

export default function(props) {
    const options = props.snapshots.map(x => ({
        label: (
            <>
                <FormattedMessage id="seasonname" values={{ season: x.season }} />
                {x.clean ? null : <FormattedMessage id="andLater" />}
            </>
        ),
        value: x.season
    }));
    return (
        <div className="timeswitch">
            <div className="row">
                <div className="col">
                    <Dropdown
                        label={<FormattedMessage id="player/timeframe" />}
                        options={options}
                        action={props.changeTime}
                        value={props.season}
                    />
                </div>
                <div className="col">
                    <Stat label={<FormattedMessage id="player/lastPlayed" />}>
                        {props.lastPlayed.last_played
                            ? new Date(get(props, "lastPlayed.last_played", new Date())).toLocaleDateString()
                            : "-"}
                    </Stat>
                    <Stat label={<FormattedMessage id="player/firstAdded" />}>
                        {new Date(props.created_at).toLocaleDateString()}
                    </Stat>
                </div>
            </div>
            <div className="playermodule__divider" />
        </div>
    );
}
