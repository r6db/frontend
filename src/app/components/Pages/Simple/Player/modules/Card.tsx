import * as React from "react";
import { getWinChance, getKillRatio } from "lib/stats";

export default function SimpleCard(props) {
    return props != null ? (
        <div className="profile-rankedstats card">
            <header className="card__header">{props.title}</header>
            <div className="card__content">
                <div className="row">
                    <div className="label">Wins</div>
                    <div className="value">{props.wins || props.won}</div>
                </div>
                <div className="row">
                    <div className="label">Losses</div>
                    <div className="value">{props.losses || props.lost}</div>
                </div>
                {props.abandons ? (
                    <div className="row">
                        <div className="label">Abandons</div>
                        <div className="value">{props.abandons}</div>
                    </div>
                ) : null}
                <div className="row">
                    <div className="label">Win rate</div>
                    <div className="value">{getWinChance(props)}%</div>
                </div>
                <div className="row">
                    <div className="label">Kills</div>
                    <div className="value">{props.kills}</div>
                </div>
                <div className="row">
                    <div className="label">Deaths</div>
                    <div className="value">{props.deaths}</div>
                </div>
                <div className="row">
                    <div className="label">K/D ratio</div>
                    <div className="value">{getKillRatio(props)}</div>
                </div>
            </div>
        </div>
    ) : null;
}
