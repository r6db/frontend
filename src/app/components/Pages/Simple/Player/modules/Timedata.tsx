import * as React from "react";
import { FormattedMessage } from "react-intl";
import { formatDuration } from "lib/stats";

export default function SimpleTime(props) {
    return (
        <div className="profile-timestamps card">
            <header className="card__header">
                <FormattedMessage id="player/timestamps" />
            </header>
            <div className="card__content">
                <div className="row">
                    <div className="label">
                        <FormattedMessage id="player/firstAdded" />
                    </div>
                    <div className="value">{new Date(props.player.created_at).toLocaleDateString()}</div>
                </div>
                {props.player.lastPlayed ? (
                    <div className="row">
                        <div className="label">
                            <FormattedMessage id="player/lastPlayed" />
                        </div>
                        <div className="value">
                            {props.player.lastPlayed.last_played
                                ? new Date(props.player.lastPlayed.last_played).toLocaleDateString()
                                : "-"}
                        </div>
                    </div>
                ) : (
                    ""
                )}
                <div className="row">
                    <div className="label">
                        <FormattedMessage id="player/casual" />
                    </div>
                    <div className="value">{formatDuration(props.player.lastPlayed.casual)}</div>
                </div>
                <div className="row">
                    <div className="label">
                        <FormattedMessage id="player/ranked" />
                    </div>
                    <div className="value">{formatDuration(props.player.lastPlayed.ranked)}</div>
                </div>
                <div className="row">
                    <div className="label">
                        <FormattedMessage id="player/total" />
                    </div>
                    <div className="value">
                        {formatDuration(props.player.lastPlayed.casual + props.player.lastPlayed.ranked)}
                    </div>
                </div>
            </div>
        </div>
    );
}
