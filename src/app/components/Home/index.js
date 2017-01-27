import m from "mithril";
import "./home.scss";

export default {
    view({ attrs, state }) {
        return (
            <div className="search">
                <div className="app-background" role="presentation" >
                    <img src="/assets/bg_prim.svg" alt="" class="clear" />
                    <img src="/assets/bg_prim.svg" alt="" class="blur" />
                </div>
                <div className="search-input">blub</div>
            </div>
        );
    }
};
