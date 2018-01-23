import Inferno from "inferno";

import Profilepic from "components/misc/Profilepic";
import Alias from "./Alias";
import Rank from "./Rank";
import Timedata from "./modules/Timedata";
import Casual from "./modules/Casual";
import General from "./modules/General";
import Ranked from "./modules/Ranked";
import RankedSeason from "./modules/RankedSeason";
import Page from "components/misc/Page";
import Link from "components/misc/Link";
import { getRegionName } from "lib/region";

export default {
    view({ attrs, state }) {
        return (
            <Page className="simple profile">
                <Page.Head>
                    <div className="container">
                        <div className="profile-header">
                            <div className="profile-info">
                                <div className="profile-identification">
                                    <div className="profile-headerimage">
                                        <span className="profile-level">lvl {attrs.level}</span>
                                        <Profilepic id={attrs.userId || attrs.id} delay={0} />
                                    </div>
                                    <div className="profile-headertext">
                                        <div className="profile-name">{attrs.name}</div>
                                        <div className="profile-flair">{attrs.flair}</div>
                                        {typeof attrs.placements.global !== "number" ? null : (
                                            <div className="profile-global-rank">
                                                Global <span>#{attrs.placements.global + 1}</span>
                                            </div>
                                        )}
                                        <Link className="profile-extended" to={`/player/${attrs.id}`}>
                                            extended view
                                        </Link>
                                    </div>
                                </div>
                                <div className="profile-seasonranks">
                                    {attrs.pastRanks
                                        .slice()
                                        .sort((a, b) => a.season - b.season)
                                        .map(x => <Rank rank={x} />)}
                                </div>
                            </div>
                            {attrs.aliases && attrs.aliases.length > 1 ? (
                                <div className="profile-aliases">{attrs.aliases.map(x => <Alias alias={x} />)}</div>
                            ) : null}
                        </div>
                    </div>
                </Page.Head>
                <Page.Content>
                    <div className={`container player-${attrs.id} is-${attrs.role || "user"}`}>
                        <div className="profile-content">
                            <div className="profile-stats">
                                <Timedata player={attrs} />
                                <General player={attrs} />
                                <Casual player={attrs} />
                                <Ranked player={attrs} />
                                {attrs.rank && attrs.rank.ncsa ? (
                                    <RankedSeason region={getRegionName("ncsa")} stats={attrs.rank.ncsa} />
                                ) : null}
                                {attrs.rank && attrs.rank.emea ? (
                                    <RankedSeason region={getRegionName("emea")} stats={attrs.rank.emea} />
                                ) : null}
                                {attrs.rank && attrs.rank.apac ? (
                                    <RankedSeason region={getRegionName("apac")} stats={attrs.rank.apac} />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </Page.Content>
            </Page>
        );
    },
};
