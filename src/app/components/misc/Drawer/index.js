import * as m from "mithril";
import { connect } from "lib/store/connect";
import "./drawer.scss";

let toggleCallback = () => { };
let showMenuCallback = () => { };

export let toggleMenu = () => toggleCallback();
export let showMenu = (bool) => showMenuCallback(bool);

const Drawer = {
    oninit({ attrs, state }) {

        // interaction stuff
        state.isDragging = false;
        state.startX = 0;
        state.currX = 0;
        const MENU_MAX_WIDTH = 280;
        const TARGET_OPACITY = 0.8;
        const DRAG_THRESHOLD = 0.30;

        showMenuCallback = function (val) {
            if (val === true) {
                state.onOpenMenu();
            } else if(val === false) {
                state.onCloseMenu();
            }
        }

        toggleCallback = function () {
            if (attrs.isOpen) {
                state.onCloseMenu();
            } else {
                state.onOpenMenu();
            }
        }

        state.onTouchStart = function (e) {
            if (attrs.isOpen) { return; }
            state.startX = e.touches[0].pageX;
            state.isDragging = true;
            state.backgroundEl.style.display = "inherit";
            state.backgroundEl.style.opacity = "0";
            state.containerEl.classList.add("no-transition");
        };
        state.onTouchMove = function (e) {
            if (!state.isDragging) { return; }
            // check distance and animate difference
            state.currX = e.touches[0].pageX;
            if ((state.currX - state.startX) < MENU_MAX_WIDTH) {
                // we are not fully opened yet.
                // animate stuff
                e.preventDefault();
                if (attrs.isOpen && state.currX - state.startX > MENU_MAX_WIDTH) {
                    // return early if the user wantds to drag further than max distance
                    return;
                } else {
                    attrs.closeMenu();
                    state.containerEl.classList.remove("is-open");
                    // otherwise display the change
                    const changeX = Math.min(state.currX - MENU_MAX_WIDTH, 0);
                    state.drawerEl.style.transform =
                        state.drawerEl.style.webkitTransform =
                        state.backgroundEl.style.transform =
                        state.backgroundEl.style.webkitTransform = `translateX(${changeX}px)`;
                    state.backgroundEl.style.opacity = (((state.currX - state.startX) / MENU_MAX_WIDTH) * TARGET_OPACITY).toFixed(2);
                }
            } else {
                // if the drag brings us over the
                attrs.openMenu();
                state.containerEl.classList.add("is-open");
                return;
            }
        };
        state.onTouchEnd = function (e) {
            if (state.isDragging) {
                state.isDragging = false;
                state.containerEl.classList.remove("no-transition");

                // check which direction to fall to and animate
                const deltaX = state.currX - state.startX;
                if (Math.abs(deltaX) > (MENU_MAX_WIDTH * DRAG_THRESHOLD)) {
                    if (state.currX < state.startX) {
                        // we are dragging to close -> close menu
                        attrs.closeMenu();
                        return;
                    } else {
                        // we dragged more than enough to 'fall open'
                        state.onOpenMenu();
                    }
                } else {
                    state.onCloseMenu();
                    m.redraw();
                }
                // we are open now. stop dragging
            }
        };
        state.onCloseMenu = function (e) {
            attrs.closeMenu();
            state.isDragging = false;
            state.startX = 0;
            state.currX = 0;
            state.containerEl.classList.remove("is-open");
            state.containerEl.classList.remove("no-transition");
            state.drawerEl.style.transform = "";
            state.drawerEl.style.webkitTransform =  "";
            state.backgroundEl.style.transform = "";
            state.backgroundEl.style.webkitTransform = "";
            state.backgroundEl.style.opacity = "";
        };
        state.onOpenMenu = function (e) {
            attrs.openMenu();
            state.isDragging = false;
            state.isOpen = true;
            state.startX = 0;
            state.currX = 0;
            state.containerEl.classList.remove("no-transition");
            state.containerEl.classList.add("is-open");
            state.drawerEl.style.transform = "";
            state.drawerEl.style.webkitTransform =  "";
            state.backgroundEl.style.transform = "";
            state.backgroundEl.style.webkitTransform = "";
            state.backgroundEl.style.opacity = "";
        };
        state.cancelEvent = function (e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };
        state.open = () => attrs.openMenu();
        state.close = () => attrs.closeMenu();
    },
    oncreate({dom, state}) {
        state.containerEl = dom;
        state.backgroundEl = dom.querySelector(".drawer-background");
        state.drawerEl = dom.querySelector(".drawer-container");
        state.menuEl = dom.querySelector(".drawer-menu");
    },
    view({state, children}) {
        return (<div className="drawer">
            <div className="drawer-topbar">
                <div className="drawer-burger" onclick={state.onOpenMenu}><span></span></div>
            </div>
            <div className="drawer-background" onclick={state.onCloseMenu}></div>
            <div className="drawer-container"
                    ontouchstart={state.onTouchStart}
                    ontouchmove={state.onTouchMove}
                    ontouchend={state.onTouchEnd}>
                <div className="drawer-menu">
                    {children}
                </div>
            </div>
        </div>);
    }
};

const mapStateToProps = getState => ({ isOpen: getState().menu })
const mapDispatchToProps = dispatch => ({
    openMenu: () => dispatch({ type: "MENU_OPEN" }),
    closeMenu: () => dispatch({ type: "MENU_CLOSE" }),
    toggleMenu: () => dispatch({ type: "MENU_TOGGLE" })
})
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);