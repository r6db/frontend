import * as m from "mithril";
import { Chart } from 'chart.js';
import "./chart.scss";

export default {
    oncreate({ attrs, dom, state }) {
        const ctx = dom.querySelector('canvas').getContext('2d');
        state.chart = new Chart(ctx, attrs);
        state.onResize = () => state.chart.resize();
        window.addEventListener("resize", state.onResize);
    },
    onremove({ state }) {
        window.removeEventListener("resize", state.onResize);
    },
    view({ attrs, state }) {
        return (
            <div className="chart">
                <canvas></canvas>
            </div>
        );
    }
}