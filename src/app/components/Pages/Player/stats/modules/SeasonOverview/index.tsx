import * as React from 'react';
import * as get from 'lodash/get';
import Icon, { GLYPHS } from 'components/misc/Icon';
import { RANKS, SEASONS } from 'lib/constants';
import './seasonoverview.scss';

export default function SeasonOverview(props) {
    if (!props.pastRanks) {
        return null;
    }
    const pr = props.pastRanks.filter((x) => x.max_rank !== 0);
    const ps =
        props.rank && props.rank.season ? pr.filter((x) => x.season === props.rank.season) : pr;
    return (
        <div className="playermodule seasonoverview">
            {pr.map((rank) => (
                <div className={`pastrank season-${rank.season}`} key={rank.season}>
                    <Icon className="pastrank__icon" glyph={GLYPHS['RANK' + rank.max_rank]} />
                    <div className="pastrank__text">
                        <div className="pastrank__season">{SEASONS[rank.season].name}</div>
                        <div className="pastrank__rank">
                            {RANKS[rank.max_rank]}
                            <span className="pastrank__mmr">{rank.max_mmr} MMR</span>
                        </div>
                    </div>
                </div>
            ))}
            <div className="seasonoverview__ubipls">
                <span>¯\_(ツ)_/¯</span>
                <span>waiting for UBI to fix old seasons</span>
            </div>
        </div>
    );
}
