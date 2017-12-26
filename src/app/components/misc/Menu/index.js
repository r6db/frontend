import * as m from "mithril";
import "./menu.scss";
import Icon, { GLYPHS } from "../Icon";
import Searchbar from "../Searchbar";
import Link from "components/misc/Link";
import { isPC, isPS4, isXbox } from "lib/constants";
import { connect } from "lib/store/connect";

const Menu = {
    view({ attrs, children }) {
        return (
            <div className="menu">
                <div className="menu__top">
                    <Link to="/" className="menu__logo">
                        <Icon glyph={GLYPHS.LOGO} />
                    </Link>
                </div>
                <div className="menu__center">
                    <Link to="/" className="menu__item">
                        Home
                    </Link>
                    <Link to={`/leaderboard/${attrs.platform}/ALL`} className="menu__item">
                        Leaderboard
                    </Link>
                    <Link to="/faq" className="menu__item">
                        FAQ
                    </Link>
                    <a href="https://github.com/r6db/r6db/issues" className="menu__item">
                        Issue / Feature Tracker
                    </a>
                </div>
                <footer className="menu__bottom is-center">
                    <div className="menu__footer">
                        <a href="https://twitter.com/Rainbow6_DB">
                            <Icon className="menu__twitter" fill="#fff" glyph={GLYPHS.TWITTER} />
                        </a>
                        <a href="mailto:info@r6db.com">
                            <Icon className="menu__email" glyph={GLYPHS.EMAIL} />
                        </a>
                        <a href="https://discord.gg/xyMTkXm">
                            <Icon className="menu__discord" fill="#fff" glyph={GLYPHS.DISCORD} />
                        </a>
                    </div>
                </footer>
            </div>
        );
    },
};

const mapStateToProps = getState => {
    const { platform } = getState();
    return { platform };
};
const mapDispatchToProps = dispatch => ({
    changePlatform: platform => e => dispatch({ type: "SELECT_PLATFORM", payload: platform }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
