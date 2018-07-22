import * as React from "react";
import Icon, { GLYPHS } from "components/misc/Icon";
import "./media.scss";

interface IMediaProps {
    title: string | JSX.Element;
    img?: string;
    icon?: string;
    label?: string;
    children?: any;
}

export default class Media extends React.PureComponent<IMediaProps> {
    render() {
        return (
            <div className="media">
                {this.props.img ? <img src={this.props.img} alt="" className="media__image" /> : ""}
                {this.props.icon ? <Icon className="media__icon" glyph={this.props.icon} /> : null}
                <div className="media__content">
                    <div className="media__contentheader">
                        <header className="media__header header">{this.props.title}</header>
                        {this.props.label ? <span className="media__label">{this.props.label}</span> : ""}
                    </div>
                    <div className="media__text">{this.props.children}</div>
                </div>
            </div>
        );
    }
}
