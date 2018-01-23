import Inferno from "inferno";
import { connect } from "lib/store/connect";
import { FadeImage } from "components/misc/FadeImage";
import "./profilepic.scss";

const onerror = e => {
    e.preventDefault();
    e.stopPropagation();
    e.target.src = "/assets/noavatar.svg";
};
const ProfilePic =  {
    view(vnode) {
        const src = vnode.attrs.isConsole
            ? `//ubisoft-avatars.akamaized.net/${vnode.attrs.id}/default_146_146.png`
            : `//uplay-avatars.s3.amazonaws.com/${vnode.attrs.id}/default_146_146.png`;
        return m(FadeImage, {
            class: "profile-pic",
            src,
            onerror
        })
    }
};

const mapStateToProps = getState => ({
    isConsole: getState().platform !== "PC",
});
export default connect(mapStateToProps, () => ({}))(ProfilePic);
