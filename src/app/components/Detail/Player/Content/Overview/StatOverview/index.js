import m from "mithril";
import  { fmtN } from "lib/format";
import "./statoverview.scss";
import StatSection from "./StatSection";
import StatColumn from "./StatColumn";
import Stat from "./Stat";

export default {
    view({attrs}) {
        const region = attrs.rank[attrs.regionByGameCount[0]];
        const { ranked, casual } = attrs.stats.matchmaking;
        return (
            <div className="statoverview">
                <StatSection title="Season">
                    <StatColumn>
                        <Stat label="MMR" value={fmtN(region.mmr, 0)}/>
                        <Stat label="Skill" value={fmtN(region.skill_mean, 2)} />
                        <Stat label="Uncertainty" value={fmtN(region.skill_stdev, 2)} />
                        <Stat label="MMR peak" value={fmtN(region.max_mmr, 0)}/>
                    </StatColumn>
                    <StatColumn>
                        <Stat label="Wins" value={region.wins} />    
                        <Stat label="Losses" value={region.losses} />
                        <Stat label="Abandons" value={region.abandons} />
                        <Stat label="WLR" value={fmtN(region.wlr * 100, 0) + "%"} />
                    </StatColumn>
                </StatSection>
                <StatSection title="Ranked">
                    <StatColumn>
                        <Stat label="Wins" value={ranked.won} />
                        <Stat label="Losses" value={ranked.lost} />
                        <Stat label="WLR" value={fmtN(ranked.wlr * 100, 0) + "%"} />
                    </StatColumn>
                    <StatColumn>
                        <Stat label="Kills" value={ranked.kills} />
                        <Stat label="Deaths" value={ranked.deaths} />
                        <Stat label="KDR" value={fmtN(ranked.kdr, 2)} />
                    </StatColumn>
                </StatSection> 
                <StatSection title="Casual">
                    <StatColumn>
                        <Stat label="Wins" value={casual.won} />
                        <Stat label="Losses" value={casual.lost} />
                        <Stat label="WLR" value={fmtN(casual.wlr * 100, 0) + "%"} />
                    </StatColumn>
                    <StatColumn>
                        <Stat label="Kills" value={casual.kills} />
                        <Stat label="Deaths" value={casual.deaths} />
                        <Stat label="KDR" value={fmtN(casual.kdr, 2)} />
                    </StatColumn>
                </StatSection>
            </div>
        );
    }
};