import * as m from "mithril";
import { connect } from "lib/store/connect";
import Searchbar from "../Searchbar";
import "./drawer.scss";

const toggleCallback = () => {};
const showMenuCallback = () => {};

export const toggleMenu = () => toggleCallback();
export const showMenu = bool => showMenuCallback(bool);

const Drawer = {
    view({ attrs, children }) {
        return (
            <div className={`drawer ${attrs.isOpen ? "drawer--open" : ""}`}>
                <button onclick={attrs.toggleMenu} className="drawer__burger">
                    <span />
                </button>
                <div className="drawer__background" onclick={attrs.closeMenu} />
                <div className="drawer__container">
                    <div className="drawer__menu">{children}</div>
                </div>
            </div>
        );
    },
};

const mapStateToProps = getState => ({ isOpen: getState().menu });
const mapDispatchToProps = dispatch => ({
    openMenu: () => dispatch({ type: "MENU_OPEN" }),
    closeMenu: () => dispatch({ type: "MENU_CLOSE" }),
    toggleMenu: () => dispatch({ type: "MENU_TOGGLE" }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
