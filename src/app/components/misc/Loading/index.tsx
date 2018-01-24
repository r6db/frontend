import * as React from "react";
import "./loading.scss";

export default class Loading extends React.Component<any, any> {
    el: any;
    constructor(props) {
        super(props);
        this.state = {
            el: null,
        };
    }
    componentWillUnMount() {
        if (this.el) {
            this.el.classList.add("loading--leaving");
        }
    }
    render() {
        return (
            <div ref={el => (this.el = el)} className="loading">
                <div className="loading__indicator" />
            </div>
        );
    }
}
