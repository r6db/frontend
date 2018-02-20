import * as React from "react";
import { FadeImage } from "components/misc/FadeImage";
import Link from "redux-first-router-link";
import Icon, { GLYPHS } from "components/misc/Icon";
import { toSimple, toPlayerTab } from "lib/store/actions";
import { formatDuration, getWinChance, getKillRatio } from "lib/stats";
import * as domain from "lib/domain";
import * as get from "lodash/get";
import "./playerheader.scss";

const isActive = (expected, actual) => (expected === actual ? "playerheader__tab--active" : "");

const exportButton = player => {
    const href = `data:application/json;base64,${btoa(JSON.stringify(player))}`;
    return (
        <a className="playerheader__link" download={`${player.name}.json`} href={href}>
            <Icon glyph={GLYPHS.DOWNLOAD} /> Download as JSON
        </a>
    );
};

class PlayerHeader extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            timeout: null,
        };
    }
    componentDidMount() {
        this.setState({
            timeout: setTimeout(() => this.rerender(), this.props.updateAvailableAt - Date.now() + 1000),
        });
    }
    rerender() {
        this.setState({ timeout: null });
    }

    render() {
        return (
            <div className="playerheader">
                <div className="playerheader__content container">
                    <div className="playerheader__image">
                        <FadeImage src={domain.getImageLink(this.props.userId || this.props.id, this.props.platform)} />
                    </div>
                    <div className="playerheader__info">
                        <header className="header playerheader__namebox">
                            <span className="playerheader__name">{this.props.name}</span>
                            <span className="playerheader__platform">{this.props.platform}</span>
                            {this.props.flair ? <div className="playerheader__flair">{this.props.flair}</div> : null}
                        </header>
                        <div className="playerheader__level">
                            {this.props.placements.global != null ? "#" + (this.props.placements.global + 1) : "-"}{" "}
                            global / lvl {this.props.level}
                        </div>
                        <div className="playerheader__links">
                            <a
                                className="playerheader__link"
                                href={domain.getUbiLink(this.props.userId || this.props.id, this.props.platform)}
                                target="_BLANK"
                            >
                                <Icon glyph={GLYPHS.UBI} /> Ubisoft
                            </a>
                            <a className="playerheader__link" href={domain.getEslLink(this.props.name)} target="_BLANK">
                                <Icon glyph={GLYPHS.ESL} /> ESL
                            </a>
                            {exportButton(this.props)}
                        </div>
                    </div>
                    <div className="playerheader__buttons">
                        {this.props.updateAvailableAt > new Date() ? (
                            <button className="button playerheader__button button--outline" disabled>
                                available {this.props.updateAvailableAt.toLocaleTimeString()}
                            </button>
                        ) : (
                            <button
                                onClick={() => this.props.updatePlayer(this.props.id)}
                                className="button playerheader__button button--outline--accent"
                            >
                                update
                            </button>
                        )}
                    </div>
                </div>
                <div className="playerheader__tabs">
                    <div className="container">
                      <Link
                          className={`playerheader__tab ${isActive("summary", this.props.tab)}`}
                          to={toPlayerTab(this.props.id, "summary")}
                      >
                          Summary
                      </Link>
                      <Link
                          className={`playerheader__tab ${isActive("ops", this.props.tab)}`}
                          to={toPlayerTab(this.props.id, "ops")}
                      >
                          Operators
                      </Link>
                      <Link
                          className={`playerheader__tab ${isActive("ranks", this.props.tab)}`}
                          to={toPlayerTab(this.props.id, "ranks")}
                      >
                          Ranks
                      </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlayerHeader;
