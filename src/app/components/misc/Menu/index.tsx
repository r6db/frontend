import * as React from "react";
import { connect } from "react-redux";
import Icon, { GLYPHS } from "../Icon";
import Searchbar from "../Searchbar";
import Link from "redux-first-router-link";
import "./menu.scss";

const Menu = props => (
    <div className="menu">
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
            <Link to={`/leaderboard/${props.platform}/ALL`} className="menu__item">
                Leaderboard
            </Link>

            <Link to={`/compare`} className="menu__item">
                Compare (beta)
            </Link>
            <Link to="/faq" className="menu__item">
                FAQ
            </Link>
        </div>
    </div>
);

const mapStateToProps = state => ({ platform: state.platform });
export default connect(mapStateToProps)(Menu);
