import * as Inferno from "inferno";
import { FadeImage } from "components/misc/FadeImage";
import Link from "components/misc/Link";
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
            <Icon glyph={GLYPHS.DOWNLOAD} /> Export
        </a>
    );
};

class PlayerHeader extends Inferno.Component<any, any> {
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
            <div className="container playerheader">
                <div className="playerheader__content">
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
                            {!this.props.twitch ? (
                                ""
                            ) : (
                                <a className="playerheader__link" href={this.props.twitch} target="_BLANK">
                                    <Icon glyph={GLYPHS.TWITCHTV} /> Twitch
                                </a>
                            )}
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
                            <span className="playerheader__divider">|</span>
                            <Link className="playerheader__link" to={toSimple(this.props.id)} target="_BLANK">
                                Simple View
                            </Link>
                        </div>
                    </div>
                    <div className="playerheader__buttons">
                        {this.props.updateAvailableAt > new Date() ? (
                            <button className="button playerheader__button button--outline" disabled="disabled">
                                available {this.props.updateAvailableAt.toLocaleTimeString()}
                            </button>
                        ) : (
                            <button
                                onclick={() =>this.props.updatePlayer(this.props.id)}
                                className="button playerheader__button button--accent"
                            >
                                update
                            </button>
                        )}
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
                        className={`playerheader__tab ${isActive("ranks", this.props.tab)}`}
                        to={toPlayerTab(this.props.id, "ranks")}
                    >
                        Ranks
                    </Link>
                    <Link
                        className={`playerheader__tab ${isActive("ops", this.props.tab)}`}
                        to={toPlayerTab(this.props.id, "ops")}
                    >
                        Operators
                    </Link>
                </div>
            </div>
        );
    }
}

export default PlayerHeader;
