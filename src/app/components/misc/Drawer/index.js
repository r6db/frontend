import m from "mithril";
import Log from "lib/log";
import "./drawer.scss";

const log = Log.child(__filename);

export default {
    oninit({state}) {
        state.isDragging = false;
        state.isOpen = false;
        state.menuMaxWidth = 0;
        state.startX = 0;
        state.currX = 0;
        const TARGET_OPACITY = 0.8;
        const DRAG_THRESHOLD = 0.30;

        state.onTouchStart = function (e) {
            if (state.isOpen) { return; }
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
            if ((state.currX - state.startX) < state.menuMaxWidth) {
                // we are not fully opened yet.
                // animate stuff
                e.preventDefault();
                if (state.isOpen && state.currX - state.startX > state.menuMaxWidth) {
                    // return early if the user wantds to drag further than max distance
                    return;
                } else {
                    state.isOpen = false;
                    state.containerEl.classList.remove("is-open");
                    // otherwise display the change
                    const changeX = Math.min(state.currX - state.menuMaxWidth, 0);
                    state.drawerEl.style.transform = state.drawerEl.style.webkitTransform = `translateX(${changeX}px)`;
                    state.backgroundEl.style.transform = state.backgroundEl.style.webkitTransform = `translateX(${state.currX}px)`;
                    state.backgroundEl.style.opacity = (((state.currX - state.startX) / state.menuMaxWidth) * TARGET_OPACITY).toFixed(2);
                }
            } else {
                // if the drag brings us over the 
                state.isOpen = true;
                state.containerEl.classList.add("is-open");
                return;
            }
        };
        state.onTouchEnd = function (e) {
            state.isDragging = false;
            state.containerEl.classList.remove("no-transition");

            // check which direction to fall to and animate
            const deltaX = state.currX - state.startX;
            if (Math.abs(deltaX) > (state.menuMaxWidth * DRAG_THRESHOLD)) {
                if (state.currX < state.startX) {
                    // we are dragging to close -> close menu
                    state.onCloseMenu();
                    return;
                } else {
                    // we dragged more than enough to 'fall open'
                    state.isDragging = false;
                    state.isOpen = true;
                    state.containerEl.classList.add("is-open");
                    state.drawerEl.style.transform = state.drawerEl.style.webkitTransform = `translateX(0px)`;
                    state.backgroundEl.style.transform = state.backgroundEl.style.webkitTransform = `translateX(${state.menuMaxWidth}px)`;
                    state.backgroundEl.style.opacity = TARGET_OPACITY;
                }
            } else {
                state.onCloseMenu();
            }
            // we are open now. stop dragging
        };
        state.onCloseMenu = function(e) {
            state.isDragging = false;
            state.isOpen = false;
            state.startX = 0;
            state.currX = 0;
            state.containerEl.classList.remove("is-open");
            state.containerEl.classList.remove("no-transition");
            state.drawerEl.style.transform = "";
            state.backgroundEl.style.display = "none";
            state.backgroundEl.style.transform = `translateX(0px)`;
        };
        state.onOpenMenu = function (e) {
            log.trace("onopenmenu");
            state.isDragging = false;
            state.isOpen = true;
            state.startX = 0;
            state.currX = 0;
            state.containerEl.classList.add("is-open");
            state.containerEl.classList.remove("no-transition");
            state.drawerEl.style.transform = "translateX(0px)";
            state.backgroundEl.style.transform = `translateX(${state.menuMaxWidth}px)`;
            state.backgroundEl.style.display = "inherit";
            state.backgroundEl.style.opacity = TARGET_OPACITY;
        };
        state.cancelEvent = function (e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };
    },
    oncreate({dom, state}) {
        state.containerEl = dom;
        state.backgroundEl = dom.querySelector(".drawer-background");
        state.drawerEl = dom.querySelector(".drawer-container");
        state.menuEl = dom.querySelector(".drawer-menu");
        state.menuMaxWidth = dom.querySelector(".drawer-menu").clientWidth;
    },
    view({state, children}) {
        return (<div className="drawer">
            <div className="drawer-menubar">
                <div className="drawer-burger" onclick={state.onOpenMenu}>MENU</div>
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