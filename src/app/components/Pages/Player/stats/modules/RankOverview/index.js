import * as Inferno from "inferno";
import * as get from "lodash/get";
import Icon, { GLYPHS } from "components/misc/Icon";
import { Ranks, Seasons } from "lib/constants";
import "./rankoverview.scss";

const CurrentRank = {
    view({ attrs }) {
        if (attrs.rank === 0 && !attrs.show) {
            return null;
        }
        return (
            <div className="currentrank">
                <div className="currentrank__icon">
                    <Icon glyph={GLYPHS["RANK" + attrs.rank]} />
                </div>
                <div className="currentrank__placement">
                    {typeof attrs.placement === "number" ? "#" + (attrs.placement + 1) : ""}
                </div>
                <div className="currentrank__region">{attrs.region}</div>
            </div>
        );
    },
};

const CurrentSeason = {
    view({ attrs }) {
        if (attrs.level < 100) {
            return <div className="rankoverview__currentseason is-underage">rankings unlock at level 100</div>;
        } else if (get(attrs, "placements.global", null) === null) {
            return;
        }
        return (
            <div className="rankoverview__currentseason">
                <CurrentRank
                    key="rank-global"
                    rank={get(attrs, "pastRanks.0.rank", 0)}
                    show={true}
                    placement={get(attrs, "placements.global", "-")}
                    region="Global"
                />
                <CurrentRank
                    key="rank-emea"
                    rank={get(attrs, "rank.emea.rank", 0)}
                    placement={get(attrs, "placements.emea", "-")}
                    region="Europe"
                />
                <CurrentRank
                    key="rank-ncsa"
                    rank={get(attrs, "rank.ncsa.rank", 0)}
                    placement={get(attrs, "placements.ncsa", "-")}
                    region="America"
                />
                <CurrentRank
                    key="rank-apac"
                    rank={get(attrs, "rank.apac.rank", 0)}
                    placement={get(attrs, "placements.apac", "-")}
                    region="Asia"
                />
            </div>
        );
    },
};

export default {
    view({ attrs }) {
        return (
            <div className="playermodule rankoverview">
                <CurrentSeason {...attrs} />
                <div className="playermodule__divider" />
                <div className="rankoverview__pastseason">
                    {attrs.pastRanks.filter(x => x.season === attrs.rank.season || x.rank !== 0).map(rank => (
                        <div className={`pastrank season-${rank.season}`} key={rank.season}>
                            <Icon className="pastrank__icon" glyph={GLYPHS["RANK" + rank.rank]} />
                            <div className="pastrank__text">
                                <div className="pastrank__season">{Seasons[rank.season]}</div>
                                <div className="pastrank__rank">
                                    {Ranks[rank.rank]}
                                    <span className="pastrank__mmr">{rank.mmr} MMR</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    },
};
