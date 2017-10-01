import * as m from "mithril";
import lozad from "lozad";
import { connect } from "lib/store/connect";

const ProfilePic = {
    oninit({ attrs, state, dom }) {
        state.src = attrs.isConsole
            ? `//ubisoft-avatars.akamaized.net/${attrs.id}/default_146_146.png`
            : `//uplay-avatars.s3.amazonaws.com/${attrs.id}/default_146_146.png`;

        state.onerror = (e) => {
            e.preventDefault();
            e.stopPropagation();
            state.src = "/assets/noavatar.svg";
            e.target.src = "/assets/noavatar.svg";
        }
    },
    oncreate() {
        const observer = lozad(".profile-pic");
        observer.observe();
    },
    view: vnode => m("img.profile-pic", { "data-src": vnode.state.src, onerror: vnode.state.onerror })
};

const mapStateToProps = getState => ({
    isConsole: getState().platform !== "PC"
})
export default connect(mapStateToProps)(ProfilePic);