import * as m from "mithril";
import Searchbar from "../Searchbar";
import { connect } from "lib/store/connect";
import "./topbar.scss";

const Topbar = {
    view({ attrs, children }) {
        return (<div className="topbar">
            <div className="topbar-burger" onclick={attrs.toggleMenu}><span></span></div>
            <div className="topbar-content">
                {children}
            </div>
        </div>);
    }
};

const mapDispatchToProps = dispatch => ({
    toggleMenu: () => dispatch({ type: "MENU_TOGGLE" })
})
export default connect(null, mapDispatchToProps)(Topbar);