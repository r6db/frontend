import * as m from "mithril";
import Icon, { GLYPHS } from "components/misc/Icon";
import { Ranks, Seasons } from "lib/constants";
import "./rankoverview.scss";

const CurrentRank = {
    view({ attrs }) {
        if (attrs.rank === 0 && !attrs.show) {
            return null;
        }
        return (
            <div className="rankoverview-current">
                <div className="rankoverview-current-icon">
                    <Icon glyph={GLYPHS["RANK" + attrs.rank]} />
                </div>
                <div className="rankoverview-current-placement">{ attrs.placement != null ? "#" + (attrs.placement + 1) : ""}</div>
                <div className="rankoverview-current-region">{attrs.region}</div>
            </div>
        )
    }
}

export default {
    view({ attrs }) {
        return (
            <div className="player-module rankoverview">
                <div className="rankoverview-currentseason">
                    <CurrentRank
                        key="rank-global"
                        rank={attrs.pastRanks[0].rank}
                        show={true}
                        placement={attrs.placements.global}
                        region="Global" />
                    <CurrentRank
                        key="rank-emea"
                        rank={attrs.rank.emea.rank}
                        placement={attrs.placements.emea}
                        region="Europe" />
                    <CurrentRank
                        key="rank-ncsa"
                        rank={attrs.rank.ncsa.rank}
                        placement={attrs.placements.ncsa}
                        region="America" />
                    <CurrentRank
                        key="rank-apac"
                        rank={attrs.rank.apac.rank}
                        placement={attrs.placements.apac}
                        region="Asia" />
                </div>
                <div className="player-module-divider"></div>
                <div className="rankoverview-pastseason">
                    {attrs.pastRanks
                        .map(rank =>
                        <div
                            className={`rankoverview-past season-${rank.season}`}
                            key={rank.season}
                        >
                            <Icon
                                className="rankoverview-past-icon"
                                glyph={GLYPHS["RANK" + rank.rank]} />
                            <div className="rankoverview-past-text">
                                <div className="rankoverview-past-season">
                                {Seasons[rank.season]}
                                </div>
                                <div className="rankoverview-past-rank">
                                    {Ranks[rank.rank]}
                                    <span className="rankoverview-past-mmr">
                                        {rank.mmr} MMR
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}