import * as Inferno from "inferno";
import "./fadeimage.scss";

const onload = e => {
    e.currentTarget.classList.add("fadeimage--loaded");
};

export const FadeImage = props => <img {...props} className={`fadeimage ${props.className}`} onLoad={onload} />;

export default FadeImage;
