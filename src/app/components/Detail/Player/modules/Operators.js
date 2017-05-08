import m from "mithril";

module.exports = {
    view: ({ attrs }) => attrs.player.stats != null
        ? (<div className="detail-operators module is-wide">
            <header className="module-header">Operators</header>
            <div className="module-content">
                { Object.keys(attrs.player.stats.operator)
                    .map(x => <div className={ `operator-icon ${ x }` }></div>) }
            </div>
        </div>)
        : ""
};
