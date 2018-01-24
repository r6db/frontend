import * as React from "react";
import { connect } from "react-redux";
import Searchbar from "../Searchbar";
import "./drawer.scss";

const Drawer = props => (
    <div className={`drawer ${props.isOpen ? "drawer--open" : ""}`}>
        <button onClick={props.toggleMenu} className="drawer__burger">
            <span />
        </button>
        <div className="drawer__background" onClick={props.closeMenu} />
        <div className="drawer__container">
            <div className="drawer__menu">{props.children}</div>
        </div>
    </div>
);

const mapStateToProps = state => ({ isOpen: state.menu });
const mapDispatchToProps = dispatch => ({
    openMenu: () => dispatch({ type: "MENU_OPEN" }),
    closeMenu: () => dispatch({ type: "MENU_CLOSE" }),
    toggleMenu: () => dispatch({ type: "MENU_TOGGLE" }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
