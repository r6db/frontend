import m from "mithril";
import { regions, getRegionName } from "lib/region";

const onlyHighest = datum => regions.reduce((acc, curr) => {
    if (!acc) {
        return Object.assign({ region: curr, id: datum.id }, datum[curr]);
    } else {
        const accSkill = acc.skill_mean - acc.skill_stdev;
        const currSkill = datum[curr].skill_mean - datum[curr].skill_stdev;
        if (currSkill > accSkill) {
            return Object.assign({ region: curr, name: getRegionName(curr) }, datum[curr]);
        } else {
            return acc;
        }
    }
}, null);

export default {
    view({attrs}) {
        const stat = onlyHighest(attrs.stats);
        return (
            <div className={`entry is-pos-${attrs.pos}`}>
                <div className="entry-place">{attrs.pos}</div>
                <div className="entry-name">{attrs.name}</div>
                <div className="entry-region">{stat.name}</div>
            </div>
        );
    }
};