import * as React from "react";
import Alias from "./Alias";
import "./aliases.scss";

const NUM_VISIBLE_ALIASES = 5;

export default class Aliases extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }
    toggleExpand() {
        this.setState({ expanded: !this.state.expanded });
    }
    render() {
        let canExpand = this.props.aliases.length > NUM_VISIBLE_ALIASES;
        let aliases = canExpand && this.state.expanded
            ? this.props.aliases
            : this.props.aliases.slice(0, NUM_VISIBLE_ALIASES)
        return (
            <div className="playermodule aliases">
                <div className="playermodule__header">Alias History</div>
                    <div className="playermodule__content">
                    <div className="aliases__list">
                        {aliases.map(x => <Alias key={x.name + x.created_at} alias={x} />)}
                    </div>
                    { canExpand
                        ? (
                            <button
                                className="aliases__expand"    
                                onClick={() => this.toggleExpand()}
                            >
                                {this.state.expanded ? 'less' : 'more'}
                            </button>
                        )
                        : null}
                </div>
            </div>
        );
    }
}
