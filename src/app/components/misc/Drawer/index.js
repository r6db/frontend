import * as m from "mithril";
import { connect } from "lib/store/connect";
import "./drawer.scss";

let toggleCallback = () => { };
let showMenuCallback = () => { };

export let toggleMenu = () => toggleCallback();
export let showMenu = (bool) => showMenuCallback(bool);

const Drawer = {
    view({ attrs, children}) {
        return (<div className={`drawer ${attrs.isOpen ? "is-open" : ""}`}>
            <div className="drawer-background" onclick={attrs.closeMenu}></div>
            <div className="drawer-container">
                <div className="drawer-menu">
                    {children}
                </div>
            </div>
        </div>);
    }
};

const mapStateToProps = getState => ({ isOpen: getState().menu })
const mapDispatchToProps = dispatch => ({
    openMenu: () => dispatch({ type: "MENU_OPEN" }),
    closeMenu: () => dispatch({ type: "MENU_CLOSE" }),
    toggleMenu: () => dispatch({ type: "MENU_TOGGLE" })
})
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);