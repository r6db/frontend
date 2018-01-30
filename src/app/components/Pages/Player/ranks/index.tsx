import * as React from "react";
import "./rankstab.scss";
import { RANKS, REGIONS } from "lib/constants";
import Icon, { GLYPHS } from "components/misc/Icon";
import Fauxtable from "components/misc/Fauxtable";

import SeasonCard from "./SeasonCard";

function didPlay(region) {
    return region.rank > 0;
}

export default class RanksTab extends React.Component<any, any> {
    getRanks(props) {
        return []
            .concat(props.rank)
            .concat(props.seasonRanks)
            .filter(x => didPlay(x.apac) || didPlay(x.emea) || didPlay(x.ncsa))
            .sort((a, b) => b.season - a.season);
    }
    render() {
        const ranks = this.getRanks(this.props);
        console.log(ranks);
        return <div className="rankstab">{ranks.map(rank => <SeasonCard key={rank.season} {...rank} />)}</div>;
    }
}
