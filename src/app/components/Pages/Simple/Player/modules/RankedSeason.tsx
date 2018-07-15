import * as React from "react";
import { FormattedMessage } from "react-intl";
import { RANKS } from "lib/constants";

export default function SimpleSeason(props) {
    return (
        <div className="profile-rankedstats card">
            <header className="card__header">
                <FormattedMessage id="player/timestamps" values={{ region: props.region }} />
            </header>
            <div className="card__content">
                <div className="row">
                    <div className="label">
                        <FormattedMessage id="player/wins" />
                    </div>
                    <div className="value">{props.season.wins}</div>
                </div>
                <div className="row">
                    <div className="label">
                        <FormattedMessage id="player/losses" />
                    </div>
                    <div className="value">{props.season.losses}</div>
                </div>
                <div className="row">
                    <div className="label">
                        <FormattedMessage id="player/abandons" />
                    </div>
                    <div className="value">{props.season.abandons}</div>
                </div>
                <div className="row">
                    <div className="label">
                        <FormattedMessage id="player/winRate" />
                    </div>
                    <div className="value">
                        {(
                            (props.season.wins / (props.season.wins + props.season.losses + props.season.abandons)) *
                            100
                        ).toFixed(2)}%
                    </div>
                </div>
                <div className="row">
                    <div className="label">
                        <FormattedMessage id="player/mmr" />
                    </div>
                    <div className="value">
                        <span className="quiet">(Max: {props.season.max_mmr.toFixed(2)})</span>{" "}
                        {props.season.mmr.toFixed(2)}
                    </div>
                </div>
                <div className="row">
                    <div className="label">
                        <FormattedMessage id="player/rank" />
                    </div>
                    <div className={`value rank-${props.season.rank}`}>
                        <span className="quiet">
                            (
                            <FormattedMessage id="player/max" />: {RANKS[props.season.max_rank]}){" "}
                        </span>
                        {RANKS[props.season.rank]}
                    </div>
                </div>
                <div className="row">
                    <div className="label">
                        <FormattedMessage id="player/skill" />
                    </div>
                    <div className="value">
                        {props.season.skill_mean.toFixed(2)}± {props.season.skill_stdev.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
}
