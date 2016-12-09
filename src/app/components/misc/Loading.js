import m from "mithril";

export default {
    onbeforeremove: ({ dom }, done) => {
        setTimeout(function () {
            dom.classList.add("is-leaving");
        }, 500);
        setTimeout(done, 1000);
    },
    view: ({ state }) => (
        <div className="loading">
            <div className="loading-indicator"></div>
        </div>
    )
};
