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
                <div className="container menu__container">
                    <Link to="/" className="menu__logo">
                        <Icon glyph={GLYPHS.LOGO} />
                    </Link>
                    <div className="menu__section menu__search">
                        <Searchbar />
                    </div>
                    <div className="menu__section menu__links">
                        <Link to="/" className="menu__item">
                            Home
                        </Link>
                        <Link to={`/leaderboard/${attrs.platform}/ALL`} className="menu__item">
                            Leaderboard
                        </Link>
                        <a target="_BLANK" className="menu__item" href="https://discord.gg/xyMTkXm">
                            Discord
                        </a>
                        <Link to="/faq" className="menu__item">
                            FAQ
                        </Link>
                    </div>
                </div>
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
