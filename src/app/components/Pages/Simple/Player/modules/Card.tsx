import * as React from "react";
import { FormattedMessage } from "react-intl";
import { getWinChance, getKillRatio } from "lib/stats";

export default function SimpleCard(props) {
    return props != null ? (
        <div className="profile-rankedstats card">
            <header className="card__header">{props.title}</header>
            <div className="card__content">
                <div className="row">
                    <div className="label">
                        <FormattedMessage id="player/wins" />
                    </div>
                    <div className="value">{props.wins || props.won}</div>
                </div>
                <div className="row">
                    <div className="label">
                        <FormattedMessage id="player/losses" />
                    </div>
                    <div className="value">{props.losses || props.lost}</div>
                </div>
                {props.abandons ? (
                    <div className="row">
                        <div className="label">
                            <FormattedMessage id="player/abandons" />
                        </div>
                        <div className="value">{props.abandons}</div>
                    </div>
                ) : null}
                <div className="row">
                    <div className="label">
                        <FormattedMessage id="player/winRate" />
                    </div>
                    <div className="value">{getWinChance(props)}%</div>
                </div>
                <div className="row">
                    <div className="label">
                        <FormattedMessage id="player/kills" />
                    </div>
                    <div className="value">{props.kills}</div>
                </div>
                <div className="row">
                    <div className="label">
                        <FormattedMessage id="player/deaths" />
                    </div>
                    <div className="value">{props.deaths}</div>
                </div>
                <div className="row">
                    <div className="label">
                        <FormattedMessage id="player/kdRatio" />
                    </div>
                    <div className="value">{getKillRatio(props)}</div>
                </div>
            </div>
        </div>
    ) : null;
}
