import * as m from "mithril";
import * as Chartist from "chartist";
import "chartist-plugin-tooltips";
import "./chart.scss";


export const colors = {
    blue: "#2e93b3",
    orange: "#d0a344",
    green: "#47893b",
    red: "#bd1e2c",
    purple: "#6e3c87"
}
export function labelInterpolationFnc(value, index, arr) {
    const quart = (arr.length) / 4 | 0;
    if (window.innerWidth < 1024) {
        // handle small screens
        return (index === 0 || index === (arr.length-1)) ? value : null;
    } else {
        // handle bigger screens
        if (index === 0 ||
            index === quart ||
            index === quart*2 ||
            index === quart * 3 ||
            index === arr.length-1) {
            return value;
        } else {
            return null
        }
    }
}


export default {
    oncreate({ attrs, dom, state }) {
        const el = dom.querySelector(".chart-element");
        const Chart = Chartist[attrs.type];
        if (!Chart) {
            console.error(`type "${attrs.type} is not valid"`);
        }
        const opts = attrs.options || {};
        opts.plugins = [Chartist.plugins.tooltip()];
        state.chart = new Chart(el, attrs.data, opts, attrs.responsiveOptions || {});
        // state.onResize = () => state.chart.update();
        // window.addEventListener("resize", state.onResize);
    },
    onremove({ state }) {
        // window.removeEventListener("resize", state.onResize);
    },
    view({ attrs, state }) {
        return (
            <div className="chart-container">
                <div className="chart-header">
                    <div className="chart-title">{attrs.title}</div>
                    <div className="chart-legend">
                        {attrs.data.series.map(series => [(
                            <div className="chart-legenditem">
                                <div className={"indicator "+ series.className}></div>
                                <div>{series.name}</div>
                            </div>
                        )])}
                    </div>
                </div>
                <div className="chart-element"></div>
            </div>
        );
    }
}