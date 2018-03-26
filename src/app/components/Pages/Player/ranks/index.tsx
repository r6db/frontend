import * as React from "react";
import "./rankstab.scss";
import { RANKS, REGIONS } from "lib/constants";
import Icon, { GLYPHS } from "components/misc/Icon";
import Fauxtable from "components/misc/Fauxtable";

import SeasonCard from "./SeasonCard";

function didPlay(region) {
    return region.rank > 0;
}

export default class RanksTab extends React.PureComponent<any, any> {
    getRanks(props) {
        return []
            .concat(props.rank)
            .concat(props.seasonRanks)
            .filter(x => didPlay(x.apac) || didPlay(x.emea) || didPlay(x.ncsa))
            .sort((a, b) => b.season - a.season);
    }
    render() {
        const ranks = this.getRanks(this.props);
        return (
            <div className="rankstab">
                {ranks.map((rank, i) => <SeasonCard key={rank.season} collapsed={i > 0} {...rank} />)}
                <div className="rankstab__subtletext">Click to reveal additional data</div>
            </div>
        );
    }
}
