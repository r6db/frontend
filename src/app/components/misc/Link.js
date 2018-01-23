import Inferno from "inferno";
import { connect } from "lib/store/connect";
import {
    actionToPath,
    pathToAction,
    redirect,
    getOptions
} from "redux-first-router";

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
                routesMap
            );
            return "#";
        }
    }
    console.warn(
        "[redux-first-router-link] `to` prop must be a string, array or action object. You provided:",
        to
    );
    return "#";
};
const Link = {
    oninit({ attrs, state }) {
        state.doLink = e => {
            if (e && "preventDefault" in e) {
                e.preventDefault();
            }
            const { querySerializer } = getOptions();
            state.serializer = querySerializer;
            let action = isAction(attrs.to)
                ? attrs.to
                : pathToAction(attrs.to, attrs.location.routesMap, querySerializer);
            attrs.link(attrs.dispatchRedirect ? redirect(action) : action);
        };
    },
    view({ attrs, state, children }) {
        return (
            <a
                id={attrs.id || null}
                href={toUrl(attrs.to, attrs.location.routesMap, state.serializer)}
                className={attrs.className || ""}
                onclick={state.doLink}
            >
                {children}
            </a>
        );
    }
};

const mapStateToProps = getState => ({
    location: getState().location
});
const mapDispatchToProps = dispatch => ({
    link: action => dispatch(action)
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);
