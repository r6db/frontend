import m from "mithril";

export default {
    onbeforeremove({ dom }, done) {
        dom.classList.add("is-leaving");
        setTimeout(done, 200);
    },
    view({ state }) {
        return (
            <div className="loading">
                <div className="loading-indicator"></div>
            </div>
        );
    }
};
