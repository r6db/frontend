import Inferno from "inferno";
import { connect } from "lib/store/connect";
import Searchbar from "../Searchbar";
import "./drawer.scss";

const Drawer = (props) => (
    <div className={`drawer ${props.isOpen ? "drawer--open" : ""}`}>
        <button onclick={props.toggleMenu} className="drawer__burger">
            <span />
        </button>
        <div className="drawer__background" onclick={props.closeMenu} />
        <div className="drawer__container">
            <div className="drawer__menu">{props.children}</div>
        </div>
    </div>
);

const mapStateToProps = getState => ({ isOpen: getState().menu });
const mapDispatchToProps = dispatch => ({
    openMenu: () => dispatch({ type: "MENU_OPEN" }),
    closeMenu: () => dispatch({ type: "MENU_CLOSE" }),
    toggleMenu: () => dispatch({ type: "MENU_TOGGLE" }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
