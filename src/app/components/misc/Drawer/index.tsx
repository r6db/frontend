import * as React from "react";
import { connect } from "react-redux";
import "./drawer.scss";

const Drawer = props => (
    <div className={`drawer ${props.isOpen ? "drawer--open" : ""}`}>
        <div className="drawer__background" onClick={props.closeMenu} />
        <div className="drawer__container">
            {props.children}
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
