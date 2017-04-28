import m from "mithril";
import Searchbar from "../Searchbar";
import store from "lib/store";
import "./topbar.scss";

export default {
    view({ children }) {
        return (<div className="topbar">
            <div className="topbar-menuspacer"></div>
            <div className="topbar-content">
                {children}
            </div>
        </div>);
    }
};