import m from "mithril";
import  { fmtN, fmtD } from "lib/format";
import "./statoverview.scss";
import StatSection from "./StatSection";
import StatColumn from "./StatColumn";
import Stat from "./Stat";

export default {
    view({attrs}) {
        const { ranked, casual } = attrs.stats.matchmaking;
        const general = attrs.stats.general;
        return (
            <div className="statoverview">
                <StatSection title="General" className="stats-general">
                    <StatColumn>
                        <Stat label="Headshot %" value={fmtN(general.hsr * 100, 1)}/>
                        <Stat label="Accuracy" value={fmtN(general.accuracy * 100, 1)}/>
                        <Stat label="Melee Kills" value={general.meleeKills}/>
                    </StatColumn>
                    <StatColumn>
                        <Stat label="Total" value={fmtD(general.timePlayed)}/>
                        <Stat label="Ranked" value={fmtD(ranked.timePlayed)}/>
                        <Stat label="Casual" value={fmtD(casual.timePlayed)}/>
                    </StatColumn>
                </StatSection>
                <StatSection title="Ranked" className="stats-ranked">
                    <StatColumn>
                        <Stat label="Wins" value={ranked.won} />
                        <Stat label="Losses" value={ranked.lost} />
                        <Stat label="Win %" value={fmtN(ranked.wlr * 100, 1)} />
                    </StatColumn>
                    <StatColumn>
                        <Stat label="Kills" value={ranked.kills} />
                        <Stat label="Deaths" value={ranked.deaths} />
                        <Stat label="KDR" value={fmtN(ranked.kdr, 2)} />
                    </StatColumn>
                </StatSection> 
                <StatSection title="Casual" className="stats-casual">
                    <StatColumn>
                        <Stat label="Wins" value={casual.won} />
                        <Stat label="Losses" value={casual.lost} />
                        <Stat label="Win %" value={fmtN(casual.wlr * 100, 1)} />
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