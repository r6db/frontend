import * as React from "react";
import { FormattedMessage } from "react-intl";
import Stat from "components/misc/Stat";
import Dropdown from "components/misc/Dropdown";
import Icon, { GLYPHS } from "components/misc/Icon";
import * as get from "lodash/get";
import { getWinChance, getKillRatio } from "lib/stats";
import "./general.scss";

export default class StatsGeneral extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
    }
    toggleExpand() {
        this.setState({ expanded: !this.state.expanded });
    }
    render() {
        const options = this.props.snapshots.map(x => ({
            label: (
                <>
                    <FormattedMessage id="seasonname" values={{ season: x.season }} />
                </>
            ),
            value: x.season
        }));
        return (
            <div className="playermodule statsgeneral">
                <div className="playermodule__header">
                    <div className="playermodule__title">
                        <FormattedMessage id="player/general" />
                    </div>
                    <Dropdown
                        label={<FormattedMessage id="player/timeframe" />}
                        options={options}
                        action={this.props.changeTime}
                        value={this.props.season}
                    />
                </div>
                <div className="playermodule__divider" />
                <div className="row overview">
                    <div className="col">
                        <Stat label={<FormattedMessage id="wins" />} size="big">
                            {get(this.props, "stats.general.won", 0)}
                        </Stat>
                        <Stat label={<FormattedMessage id="losses" />} size="big">
                            {get(this.props, "stats.general.lost", 0)}
                        </Stat>
                    </div>
                    <div className="col">
                        <Stat label={<FormattedMessage id="kills" />} size="big">
                            {get(this.props, "stats.general.kills", 0)}
                        </Stat>
                        <Stat label={<FormattedMessage id="deaths" />} size="big">
                            {get(this.props, "stats.general.deaths", 0)}
                        </Stat>
                    </div>
                    <div className="col">
                        <Stat label={<FormattedMessage id="assists" />} size="big">
                            {get(this.props, "stats.general.assists", 0)}
                        </Stat>
                        <Stat label={<FormattedMessage id="winRate" />} size="big">
                            {getWinChance(this.props.stats.general)}
                        </Stat>
                    </div>
                    <div className="col">
                        <Stat label={<FormattedMessage id="kdRatio" />} size="big">
                            {getKillRatio(this.props.stats.general)}
                        </Stat>
                        <Stat label={<FormattedMessage id="melee" />} size="big">
                            {get(this.props, "stats.general.meleeKills", 0)}
                        </Stat>
                    </div>
                    <div className="col">
                        <Stat label={<FormattedMessage id="dbnos" />} size="big">
                            {get(this.props, "stats.general.dbno", 0)}
                        </Stat>
                        <Stat label={<FormattedMessage id="headshots" />} size="big">
                            {get(this.props, "stats.general.headshot", 0)}
                        </Stat>
                    </div>
                </div>
                {this.state.expanded ? (
                    <button className="playermodule__expand" onClick={() => this.toggleExpand()}>
                        <Icon glyph={GLYPHS.CHEVRONUP} /> <FormattedMessage id="player/showLess" />
                    </button>
                ) : (
                    <button className="playermodule__expand" onClick={() => this.toggleExpand()}>
                        <Icon glyph={GLYPHS.CHEVRONDOWN} /> <FormattedMessage id="player/showMore" />
                    </button>
                )}
                {this.state.expanded ? (
                    <div className="row misc">
                        <div className="col">
                            <Stat label={<FormattedMessage id="headshotRatio" />}>
                                {get(this.props, "stats.general.headshotRatio", 0).toFixed(2)}%
                            </Stat>
                            <Stat label={<FormattedMessage id="headshotHits" />}>
                                {get(this.props, "stats.general.headshotChance", 0).toFixed(2)}%
                            </Stat>
                            <Stat label={<FormattedMessage id="revives" />}>
                                {get(this.props, "stats.general.revives", 0)}
                            </Stat>
                            <Stat label={<FormattedMessage id="gadgetsDestroyed" />}>
                                {get(this.props, "stats.general.gadgetsDestroyed", 0)}
                            </Stat>
                            <Stat label={<FormattedMessage id="penKills" />}>
                                {get(this.props, "stats.general.penetrationKills", 0)}
                            </Stat>
                            <Stat label={<FormattedMessage id="abandons" />}>
                                {get(this.props, "stats.ranked.abandons", 0)}
                            </Stat>
                        </div>
                        <div className="col">
                            <Stat label={<FormattedMessage id="revivesDenied" />}>
                                {get(this.props, "stats.general.revivesDenied", 0)}
                            </Stat>
                            <Stat label={<FormattedMessage id="suicides" />}>
                                {get(this.props, "stats.general.suicides", 0)}
                            </Stat>
                            <Stat label={<FormattedMessage id="blindKills" />}>
                                {get(this.props, "stats.general.blindKills", 0)}
                            </Stat>
                            <Stat label={<FormattedMessage id="rappelBreaches" />}>
                                {get(this.props, "stats.general.rappelBreaches", 0)}
                            </Stat>
                            <Stat label={<FormattedMessage id="player/lastPlayed" />}>
                                {this.props.lastPlayed.last_played
                                    ? new Date(get(this.props, "lastPlayed.last_played", new Date())).toLocaleDateString()
                                    : "-"}
                            </Stat>
                            <Stat label={<FormattedMessage id="player/firstAdded" />}>
                                {new Date(this.props.created_at).toLocaleDateString()}
                            </Stat>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
