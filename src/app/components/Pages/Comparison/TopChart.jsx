import * as m from "mithril";

export default {
    view({ attrs }) {
        return (
            <div>
                {attrs.data.map(x => (
                    <div className="stat">
                        <div className="stat__value">{x.value}</div>
                        <div className="stat__label">{x.label}</div>
                    </div>
                ))}
            </div>
        );
    },
};
