import * as Inferno from "inferno";
import "./media.scss";

interface IMediaProps {
    title: string;
    img?: string;
    label?: string;
    children?: any;
}

const Media = (props: IMediaProps) => (
    <div className="media">
        {props.img ? <img src={props.img} alt="" className="media__image" /> : ""}
        <div className="media__content">
            <div className="media__contentheader">
                <header className="media__header">{props.title}</header>
                {props.label ? <span className="media__label">{props.label}</span> : ""}
            </div>
            <div className="media__text">{props.children}</div>
        </div>
    </div>
);
export default Media;
