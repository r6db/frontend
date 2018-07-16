import * as React from "react";
import { FormattedMessage } from "react-intl";
import { FadeImage } from "components/misc/FadeImage";
import Button from "components/misc/Button";
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
            <Icon glyph={GLYPHS.DOWNLOAD} />
            <FormattedMessage id="player/downloadJson" />
        </a>
    );
};

class PlayerHeader extends React.PureComponent<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            interval: null
        };
    }
    componentDidMount() {
        this.setState({
            interval: setInterval(() => this.rerender(), 5 * 1000)
        });
    }
    rerender() {
        if (Date.now() >= this.props.updateAvailableAt.getTime()) {
            clearInterval(this.state.interval);
            this.setState({ interval: null });
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        return (
            <div className="playerheader">
                <div className="playerheader__container container">
                    <div className="playerheader__content">
                        <div className="playerheader__image">
                            <FadeImage
                                src={domain.getImageLink(this.props.userId || this.props.id, this.props.platform)}
                            />
                        </div>
                        <div className="playerheader__info">
                            <div className="playerheader__namebox">
                                <header className="header playerheader__namewrapper">
                                    <span className="playerheader__name">{this.props.name}</span>
                                    <span className="playerheader__platform">{this.props.platform}</span>
                                </header>
                                {this.props.flair ? (
                                    <div className="playerheader__flair">{this.props.flair}</div>
                                ) : null}
                            </div>
                            <div className="playerheader__level">
                                <FormattedMessage
                                    id="player/rankingLevel"
                                    values={{
                                        placement:
                                            this.props.placements.global != null
                                                ? "#" + (this.props.placements.global + 1)
                                                : "-",
                                        level: this.props.level
                                    }}
                                />
                            </div>
                            <div className="playerheader__links">
                                <a
                                    className="playerheader__link"
                                    href={domain.getUbiLink(this.props.userId || this.props.id, this.props.platform)}
                                    target="_BLANK"
                                >
                                    <Icon glyph={GLYPHS.UBI} />
                                    <FormattedMessage id="player/ubisoft" />
                                </a>
                                <a
                                    className="playerheader__link"
                                    href={domain.getEslLink(this.props.name)}
                                    target="_BLANK"
                                >
                                    <Icon glyph={GLYPHS.ESL} />
                                    <FormattedMessage id="player/esl" />
                                </a>
                                {exportButton(this.props)}
                                <div className="hidden-small">
                                    <span className="playerheader__divider">|</span>
                                    <Link className="playerheader__link" to={toSimple(this.props.id)}>
                                        <FormattedMessage id="player/simple" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="playerheader__tabs">
                        <div className="playerheader__tabs--left">
                            <Link
                                className={`playerheader__tab ${isActive("summary", this.props.tab)}`}
                                to={toPlayerTab(this.props.id, "summary")}
                            >
                                <FormattedMessage id="player/tab/summary" />
                            </Link>
                            <Link
                                className={`playerheader__tab ${isActive("ops", this.props.tab)}`}
                                to={toPlayerTab(this.props.id, "ops")}
                            >
                                <FormattedMessage id="player/tab/operators" />
                            </Link>
                            <Link
                                className={`playerheader__tab ${isActive("ranks", this.props.tab)}`}
                                to={toPlayerTab(this.props.id, "ranks")}
                            >
                                <FormattedMessage id="player/tab/ranks" />
                            </Link>
                        </div>
                        <div className="playerheader__tabs--right">
                            {this.props.updateAvailableAt > new Date() ? (
                                <button className="playerheader__tab update">
                                    {
                                        <FormattedMessage
                                            id="player/available"
                                            values={{
                                                date: this.props.updateAvailableAt.toLocaleTimeString()
                                            }}
                                        />
                                    }
                                </button>
                            ) : (
                                <button
                                    className="playerheader__tab update update--active"
                                    onClick={() => this.props.updatePlayer(this.props.id)}
                                >
                                    <Icon glyph={GLYPHS.REFRESH} />
                                </button>
                            )}
                            {this.props.isFavorite ? (
                                <button
                                    className="playerheader__tab favorite favorite--active"
                                    onClick={() => this.props.unfavoritePlayer(this.props.id)}
                                >
                                    <Icon glyph={GLYPHS.STARFULL} />
                                </button>
                            ) : (
                                <button
                                    className="playerheader__tab favorite"
                                    onClick={() => this.props.favoritePlayer(this.props.id)}
                                >
                                    <Icon glyph={GLYPHS.STAR} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        isFavorite,
        favorites,
        loading,
        location: { payload }
    } = state;

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

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(PlayerHeader);
