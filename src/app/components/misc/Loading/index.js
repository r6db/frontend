import * as m from "mithril";
import "./loading.scss";

export default {
    onbeforeremove({ dom }, done) {
        dom.classList.add("is-leaving");
        setTimeout(done, 60);
    },
    view({ attrs, state }) {
        return (
            <div className="loading">
                <div className="loading-indicator"></div>
                <div className="loading-message">{attrs.message}</div>
            </div>
        );
    }
};
