import * as m from "mithril";
import "./menu.scss";
import Icon, { GLYPHS } from "../Icon";
import Searchbar from "../Searchbar";
import { isPC, isPS4, isXbox } from "lib/constants";
import Tweet from "./Tweet";
import Link from "components/misc/Link";
import { connect } from "lib/store/connect";


const Menu = {
    view({ attrs, children }) {
        return (
            <div className="menu">
                <div className="menu-top">
                    <Link to="/" className="menu-logo">
                        <Icon glyph={GLYPHS.LOGO} />
                    </Link>
                </div>
                <div className="menu-center">
                    <Link to="/" className="menu-item">Home</Link>
                    <Link to="/leaderboard/PC/ALL" className="menu-item">Leaderboard</Link>
                    <Link to="/faq" className="menu-item">FAQ</Link>
                    <a href="https://gitlab.com/gitgudscrub/frontend/issues" className="menu-item">Issue / Feature Tracker</a>
                </div>
                <footer className="menu-bottom is-center">
                    <div className="menu-tweets">{
                        (attrs.tweets)
                            .map(tweet => <Tweet {...tweet} />)
                    }</div>
                    <div className="menu-footer">
                        <a href="https://twitter.com/Rainbow6_DB">
                            <Icon className="menu-twitter" fill="#fff" glyph={GLYPHS.TWITTER} />
                        </a>
                        <a href="mailto:info@r6db.com">
                            <Icon className="menu-email" glyph={GLYPHS.EMAIL} />
                        </a>
                    </div>
                </footer>
            </div>
        );
    }
};

const mapStateToProps = getState => {
    const { tweets, platform } = getState();
    return { tweets, platform };
}
const mapDispatchToProps = dispatch => ({
    changePlatform: platform => e => dispatch({ type: "SELECT_PLATFORM", payload: platform })
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);