import * as Inferno from "inferno";
import Player from "./Player";
import NotFound from "../Errors/NotFound";
import NoPlaytime from "../Errors/NoPlaytime";
import NoAliases from "../Errors/NoAliases";
import { connect } from "inferno-redux";
import "./profile.scss";

const Profile = {
    onremove({ state }) {
        console.debug("<Profile /> onremove");
    },
    oninit({ attrs, state }) {
        console.debug("<Profile /> oninit");
    },
    view({ attrs, state }) {
        if (attrs.loading) {
            return null;
        } else if (!attrs.data || !attrs.data.id) {
            return <NotFound />;
        } else if (attrs.data.flags && attrs.data.flags.noPlaytime) {
            return <NoPlaytime {...attrs.data} />;
        } else if (attrs.data.flags && attrs.data.flags.noAliases) {
            return <NoAliases {...attrs.data} />;
        } else {
            return <Player {...attrs.data} />;
        }
    }
};


const mapStateToProps = getState => {
    const { players, location: { payload: { id } } } = getState();

    return {
        data: players[id] || {}
    }
}

export default connect(mapStateToProps)(Profile);