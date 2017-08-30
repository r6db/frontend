import * as m from "mithril";
import { Ranks } from "lib/constants";

const games = s => s.wins + s.losses;

export default {
    season: null,
    oninit({ attrs, state}) {
        const season = attrs.stats;
        if (season.rank || (season.wins + season.losses)) {
            state.season = season;
        } else {
            state.season = null;
        }
    },
    view: ({ attrs, state }) => state.season != null
        ? (<div className="profile-rankedstats card">
            <header className="card-header">Ranked Season ({attrs.region})</header>
            <div className="card-content">
                 <div className="row">
                    <div className="label">Wins</div>
                    <div className="value">{state.season.wins}</div>
                </div>
                <div className="row">
                    <div className="label">Losses</div>
                    <div className="value">{state.season.losses}</div>
                </div>
                <div className="row">
                    <div className="label">Abandons</div>
                    <div className="value">{state.season.abandons}</div>
                </div>
                <div className="row">
                    <div className="label">Win rate</div>
                    <div className="value">{
                        ((state.season.wins /
                            (state.season.wins + state.season.losses + state.season.abandons)) * 100
                        ).toFixed(2)
                    }%</div>
                </div>
                <div className="row">
                    <div className="label">MMR</div>
                    <div className="value"><span className="quiet">(Max: {state.season.max_mmr.toFixed(2)})</span> {state.season.mmr.toFixed(2)}</div>
                </div>
                <div className="row">
                    <div className="label">Rank</div>
                    <div className={`value rank-${state.season.rank}`}><span className="quiet">(Max: {Ranks[state.season.max_rank]}) </span>{Ranks[state.season.rank]}</div>
                </div>
                <div className="row">
                    <div className="label">Skill</div>
                    <div className="value">{state.season.skill_mean.toFixed(2)}± {state.season.skill_stdev.toFixed(2)}</div>
                </div>
            </div>
        </div>)
        : ""
};
