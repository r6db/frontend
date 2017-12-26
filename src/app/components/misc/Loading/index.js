import * as m from "mithril";
import "./loading.scss";

export default {
    onbeforeremove({ dom }, done) {
        dom.classList.add("loading-leaving");
        setTimeout(done, 60);
    },
    view({ attrs, state }) {
        return (
            <div className="loading">
                <div className="loading__indicator" />
                <div className="loading__message">{attrs.message}</div>
            </div>
        );
    },
};
