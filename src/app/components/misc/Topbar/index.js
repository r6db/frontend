import * as m from "mithril";
import Searchbar from "../Searchbar";
import { connect } from "lib/store/connect";
import "./topbar.scss";

const Topbar = {
    view({ attrs, children }) {
        return (
            <div className="topbar">
                <div className="topbar__burger" onclick={attrs.toggleMenu}>
                    <span />
                </div>
                <div className="topbar__content">{children}</div>
            </div>
        );
    },
};

const mapDispatchToProps = dispatch => ({
    toggleMenu: () => dispatch({ type: "MENU_TOGGLE" }),
});
export default connect(null, mapDispatchToProps)(Topbar);
