import * as Inferno from "inferno";
import { connect } from "inferno-redux";
import { actionToPath, pathToAction, redirect, getOptions } from "redux-first-router";

const isAction = to => typeof to === "object" && !Array.isArray(to);
const toUrl = (to, routesMap, serializer) => {
    if (to && typeof to === "string") {
        return to;
    } else if (Array.isArray(to)) {
        return `/${to.join("/")}`;
    } else if (typeof to === "object") {
        const action = to;
        try {
            return actionToPath(action, routesMap, serializer);
        } catch (e) {
            console.warn(
                "[redux-first-router-link] could not create path from action:",
                action,
                "For reference, here are your current routes:",
                routesMap,
            );
            return "#";
        }
    }
    console.warn("[redux-first-router-link] `to` prop must be a string, array or action object. You provided:", to);
    return "#";
};

class Link extends Inferno.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            serializer: null,
        };
    }

    doLink(e) {
        if (e && "preventDefault" in e) {
            e.preventDefault();
        }
        const { querySerializer } = getOptions();
        this.setState({ serializer: querySerializer });
        let action = isAction(this.props.to)
            ? this.props.to
            : pathToAction(this.props.to, this.props.location.routesMap, querySerializer);
        this.props.link(this.props.dispatchRedirect ? redirect(action) : action);
    }

    render() {
        return (
            <a
                id={this.props.id || null}
                href={toUrl(this.props.to, this.props.location.routesMap, this.state.serializer)}
                className={this.props.className || ""}
                onclick={this.doLink}
            >
                {this.props.children}
            </a>
        );
    }
}

const mapStateToProps = getState => ({
    location: getState().location,
});
const mapDispatchToProps = dispatch => ({
    link: action => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);
