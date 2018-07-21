import * as React from "react";
import { FormattedMessage } from "react-intl";
import "./rankstab.scss";
import Media from "components/misc/Media";
import Icon, { GLYPHS } from "components/misc/Icon";

import SeasonCard from "./SeasonCard";

function didPlay(region) {
    return region.rank > 0;
}

export default class RanksTab extends React.PureComponent<any, any> {
    getRanks(props) {
        return props.seasonRanks
            .filter(x => didPlay(x.apac) || didPlay(x.emea) || didPlay(x.ncsa))
            .sort((a, b) => b.season - a.season);
    }
    render() {
        const ranks = this.getRanks(this.props);
        if (this.props.pastRanks.every(x => x.max_rank === 0)) {
            return (
                <div className="rankstab">
                    <FormattedMessage id="favorites/empty_header">
                        {message => (
                            <Media icon={GLYPHS.ALERT} title={message}>
                                <FormattedMessage id="player/noOldSeasonData" />
                            </Media>
                        )}
                    </FormattedMessage>
                </div>
            );
        }
        return (
            <div className="rankstab">
                {ranks.map((rank, i) => <SeasonCard key={rank.season} collapsed={i > 0} {...rank} />)}
                <div className="rankstab__subtletext">
                    <FormattedMessage id="player/seeMore" />
                </div>
            </div>
        );
    }
}
