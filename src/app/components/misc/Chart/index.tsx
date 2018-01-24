import * as React from "react";
import * as Chartist from "chartist";
import "chartist-plugin-tooltips";
import "./chart.scss";

export const colors = {
    blue: "#2e93b3",
    orange: "#d0a344",
    green: "#47893b",
    red: "#bd1e2c",
    purple: "#6e3c87",
};
export function labelInterpolationFnc(value, index, arr) {
    const quart = (arr.length / 4) | 0;
    if (window.innerWidth < 1024) {
        // handle small screens
        return index === 0 || index === arr.length - 1 ? value : null;
    } else {
        // handle bigger screens
        if (index === 0 || index === quart || index === quart * 2 || index === quart * 3 || index === arr.length - 1) {
            return value;
        } else {
            return null;
        }
    }
}

export default class Chart extends React.Component<any, any> {
    el: HTMLElement;

    constructor(props) {
        super(props);

        this.state = {
            chart: null,
        };
    }
    componentDidMount() {
        const Chart = Chartist[this.props.type];
        if (!Chart) {
            console.error(`type "${this.props.type} is not valid"`);
        }
        const opts = this.props.options || {};
        opts.plugins = [Chartist.plugins.tooltip()];
        this.setState({
            chart: new Chart(this.el, this.props.data, opts, this.props.responsiveOptions || {}),
        });
    }
    render() {
        return (
            <div className="chart">
                <div className="chart__header">
                    {this.props.hideTitle || false ? null : <div className="chart__title">{this.props.title}</div>}
                    {this.props.hideLegend || false ? null : (
                        <div className="chart__legend">
                            {this.props.data.series.map(series => [
                                <div key={series.name} className="chart__legenditem">
                                    <div className={"indicator " + series.className} />
                                    <div>{series.name}</div>
                                </div>,
                            ])}
                        </div>
                    )}
                </div>
                <div className="chart__element" ref={el => (this.el = el)} />
            </div>
        );
    }
}
