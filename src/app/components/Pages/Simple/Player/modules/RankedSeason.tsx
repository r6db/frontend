import * as React from "react";
import { RANKS } from "lib/constants";

export default function SimpleSeason(props) {
    return (
        <div className="profile-rankedstats card">
            <header className="card__header">Ranked Season ({props.region})</header>
            <div className="card__content">
                <div className="row">
                    <div className="label">Wins</div>
                    <div className="value">{props.season.wins}</div>
                </div>
                <div className="row">
                    <div className="label">Losses</div>
                    <div className="value">{props.season.losses}</div>
                </div>
                <div className="row">
                    <div className="label">Abandons</div>
                    <div className="value">{props.season.abandons}</div>
                </div>
                <div className="row">
                    <div className="label">Win rate</div>
                    <div className="value">
                        {(
                            props.season.wins /
                            (props.season.wins + props.season.losses + props.season.abandons) *
                            100
                        ).toFixed(2)}%
                    </div>
                </div>
                <div className="row">
                    <div className="label">MMR</div>
                    <div className="value">
                        <span className="quiet">(Max: {props.season.max_mmr.toFixed(2)})</span>{" "}
                        {props.season.mmr.toFixed(2)}
                    </div>
                </div>
                <div className="row">
                    <div className="label">Rank</div>
                    <div className={`value rank-${props.season.rank}`}>
                        <span className="quiet">(Max: {RANKS[props.season.max_rank]}) </span>
                        {RANKS[props.season.rank]}
                    </div>
                </div>
                <div className="row">
                    <div className="label">Skill</div>
                    <div className="value">
                        {props.season.skill_mean.toFixed(2)}± {props.season.skill_stdev.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
}
