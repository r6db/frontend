import * as React from "react";
import { getWinChance, getKillRatio } from "lib/stats";

export default function SimpleCard(props) {
    return props.player.stats != null ? (
        <div className="profile-rankedstats card">
            <header className="card__header">Ranked Stats</header>
            <div className="card__content">
                <div className="row">
                    <div className="label">Wins</div>
                    <div className="value">{props.player.stats.ranked.won}</div>
                </div>
                <div className="row">
                    <div className="label">Losses</div>
                    <div className="value">{props.player.stats.ranked.lost}</div>
                </div>
                {props.abandons ? (
                    <div className="row">
                        <div className="label">Abandons</div>
                        <div className="value">{props.player.stats.ranked.abandons}</div>
                    </div>
                ) : null}
                <div className="row">
                    <div className="label">Win rate</div>
                    <div className="value">{getWinChance(props.player.stats.ranked)}%</div>
                </div>
                <div className="row">
                    <div className="label">Kills</div>
                    <div className="value">{props.player.stats.ranked.kills}</div>
                </div>
                <div className="row">
                    <div className="label">Deaths</div>
                    <div className="value">{props.player.stats.ranked.deaths}</div>
                </div>
                <div className="row">
                    <div className="label">K/D ratio</div>
                    <div className="value">{getKillRatio(props.player.stats.ranked)}</div>
                </div>
            </div>
        </div>
    ) : null;
}
