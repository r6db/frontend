import * as React from "react";
import { FadeImage } from "components/misc/FadeImage";
import Link from "redux-first-router-link";
import Icon, { GLYPHS } from "components/misc/Icon";
import { connect } from "react-redux";
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

class PlayerHeader extends React.PureComponent<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            interval: null,
        };
    }
    componentDidMount() {
        this.setState({
            interval: setInterval(() => this.rerender(),  30 * 1000),
        });
    }
    rerender() {
        if (Date.now() >= this.props.updateAvailableAt.getTime()) {
            clearInterval(this.state.interval);
            this.setState({ interval: null });
        }
    }

    render() {
        return (
            <div className="playerheader">
                <div className="playerheader__container container">
                    <div className="playerheader__content">
                        <div className="playerheader__image">
                            <FadeImage src={domain.getImageLink(this.props.userId || this.props.id, this.props.platform)} />
                        </div>
                        <div className="playerheader__info">
                            <header className="header playerheader__namebox">
                                <div className="playerheader__namewrapper">
                                    <span className="playerheader__name">{this.props.name}</span>
                                    <span className="playerheader__platform">{this.props.platform}</span>
                                </div>
                                {this.props.flair ? <div className="playerheader__flair">{this.props.flair}</div> : null}
                            </header>
                            <div className="playerheader__level">
                                {this.props.placements.global != null ? "#" + (this.props.placements.global + 1) + " global / " : ""}{" "}
                                level {this.props.level}
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
                                <div className="hidden-small">
                                    <span className="playerheader__divider">|</span>
                                    <Link className="playerheader__link" to={toSimple(this.props.id)}>
                                        Simple View
                                    </Link>
                                </div>
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
                                    <Icon glyph={GLYPHS.REFRESH} /> update
                                </button>
                            )}
                            {this.props.isFavorite
                                ? <button
                                      onClick={() => this.props.unfavoritePlayer(this.props.id)}
                                      className="button playerheader__button button--outline--primary active"
                                  >
                                    <Icon glyph={GLYPHS.STARFULL} /> favorite
                                  </button>
                                : <button
                                      onClick={() => this.props.favoritePlayer(this.props.id)}
                                      className="button playerheader__button button--outline--subtile"
                                  >
                                    <Icon glyph={GLYPHS.STAR} /> favorite
                                  </button>
                            }
                        </div>
                    </div>
                    <div className="playerheader__tabs">
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

const mapStateToProps = state => {
    const { isFavorite, favorites, loading, location: { payload } } = state;

    return {
        loading,
        isFavorite: favorites.includes(payload.id),
        favorites
    };
};
const mapDispatchtoProps = (dispatch, state) => {
    return {
        favoritePlayer: id => dispatch({ type: "FAV_PLAYER", payload: id }),
        unfavoritePlayer: id => dispatch({ type: "UNFAV_PLAYER", payload: id })
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(PlayerHeader);
