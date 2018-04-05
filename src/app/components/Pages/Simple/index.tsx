import * as React from "react";
import { hot } from "react-hot-loader";
import Player from "./Player";
import NotFound from "../Errors/NotFound";
import NoPlaytime from "../Errors/NoPlaytime";
import NoAliases from "../Errors/NoAliases";
import { connect } from "react-redux";
import "./profile.scss";

function Profile(props) {
    if (props.loading) {
        return null;
    } else if (!props.data || !props.data.id) {
        return <NotFound />;
    } else if (props.data.flags && props.data.flags.noPlaytime) {
        return <NoPlaytime {...props.data} />;
    } else if (props.data.flags && props.data.flags.noAliases) {
        return <NoAliases {...props.data} />;
    } else {
        return <Player {...props.data} />;
    }
}

const mapStateToProps = state => {
    const { players, location: { payload: { id } } } = state;

    return {
        data: players[id] || {},
    };
};

export default hot(module)(connect(mapStateToProps)(Profile));
