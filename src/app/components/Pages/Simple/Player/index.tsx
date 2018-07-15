import * as React from "react";
import * as get from "lodash/get";
import { FormattedMessage } from "react-intl";
import FadeImage from "components/misc/FadeImage";
import Alias from "./Alias";
import Rank from "./Rank";
import Timedata from "./modules/Timedata";
import SimpleCard from "./modules/Card";
import RankedSeason from "./modules/RankedSeason";
import Page, { PageHead, PageContent } from "components/misc/Page";
import Link from "redux-first-router-link";
import { getRegionName } from "lib/region";
import { getImageLink } from "lib/domain";

export default function SimplePlayer(props) {
    return (
        <Page className="simple profile">
            <PageHead>
                <div className="container">
                    <div className="profile-header">
                        <div className="profile-info">
                            <div className="profile-identification">
                                <div className="profile-headerimage">
                                    <span className="profile-level">lvl {props.level}</span>
                                    <FadeImage src={getImageLink(props.userId || props.id, props.platform)} />
                                </div>
                                <div className="profile-headertext">
                                    <div className="profile-name">{props.name}</div>
                                    <div className="profile-flair">{props.flair}</div>
                                    {typeof props.placements.global !== "number" ? null : (
                                        <div className="profile-global-rank">
                                            <FormattedMessage
                                                id="player/placement"
                                                values={{ placement: props.placements.global + 1 }}
                                            />
                                        </div>
                                    )}
                                    <Link className="profile-extended" to={`/player/${props.id}`}>
                                        <FormattedMessage id="player/extended" />
                                    </Link>
                                </div>
                            </div>
                            <div className="profile-seasonranks">
                                {props.pastRanks
                                    .slice()
                                    .sort((a, b) => a.season - b.season)
                                    .map(x => <Rank key={x.season} rank={x} />)}
                            </div>
                        </div>
                        {props.aliases && props.aliases.length > 1 ? (
                            <div className="profile-aliases">
                                {props.aliases.map(x => <Alias key={x.name + x.created_at} alias={x} />)}
                            </div>
                        ) : null}
                    </div>
                </div>
            </PageHead>
            <PageContent>
                <div className={`container player-${props.id} is-${props.role || "user"}`}>
                    <div className="profile-content">
                        <div className="profile-stats">
                            <Timedata player={props} />
                            <SimpleCard title="General" {...props.stats.general} />
                            <SimpleCard title="Casual" {...props.stats.casual} />
                            <SimpleCard title="Ranked" {...props.stats.ranked} />
                            {get(props, "rank.ncsa.rank", null) ? (
                                <RankedSeason region={getRegionName("ncsa")} season={props.rank.ncsa} />
                            ) : null}
                            {get(props, "rank.emea.rank", null) ? (
                                <RankedSeason region={getRegionName("emea")} season={props.rank.emea} />
                            ) : null}
                            {get(props, "rank.apac.rank", null) ? (
                                <RankedSeason region={getRegionName("apac")} season={props.rank.apac} />
                            ) : null}
                        </div>
                    </div>
                </div>
            </PageContent>
        </Page>
    );
}
