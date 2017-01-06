import m from "mithril";

export default {
    view: ({ attrs }) => (
        <div className="season-rank">
            <img src={"/assets/ranks/" + attrs.rank.rank + ".svg"} class="rank-image" />
            <div className="rank-season">Season { attrs.rank.season }</div>
        </div>
    )
};
