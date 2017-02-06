import m from "mithril";
import Log from "lib/log";
import "./drawer.scss";

const log = Log.child(__filename);

export default {
    oninit({attrs, children, state}) {

        /**
         * check if we have a key to select top content and split children
         */
        if (attrs.topContent)  {
            state.topChildren = children.filter(x => x.key === attrs.topContent);
            state.menuChildren = children.filter(x => x.key !== attrs.topContent);
        } else {
            state.topChildren = [];
            state.menuChildren = children;
        }
        

        // interaction stuff
        state.isDragging = false;
        state.isOpen = false;
        state.startX = 0;
        state.currX = 0;
        const MENU_MAX_WIDTH = 280;
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
            if ((state.currX - state.startX) < MENU_MAX_WIDTH) {
                // we are not fully opened yet.
                // animate stuff
                e.preventDefault();
                if (state.isOpen && state.currX - state.startX > MENU_MAX_WIDTH) {
                    // return early if the user wantds to drag further than max distance
                    return;
                } else {
                    state.isOpen = false;
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
                state.isOpen = true;
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
                        state.onCloseMenu();
                        return;
                    } else {
                        // we dragged more than enough to 'fall open'
                        state.isDragging = false;
                        state.isOpen = true;
                        state.containerEl.classList.add("is-open");
                        state.drawerEl.style.transform = "";
                        state.drawerEl.style.webkitTransform =  "";
                        state.backgroundEl.style.transform = "";
                        state.backgroundEl.style.webkitTransform = "";
                        state.backgroundEl.style.opacity = "";
                    }
                } else {
                    state.onCloseMenu();
                }
                // we are open now. stop dragging
            }
            
        };
        state.onCloseMenu = function (e) {
            console.log("close menu");
            state.isDragging = false;
            state.isOpen = false;
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
            log.trace("menu open");
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
    },
    oncreate({dom, state}) {
        state.containerEl = dom;
        state.backgroundEl = dom.querySelector(".drawer-background");
        state.drawerEl = dom.querySelector(".drawer-container");
        state.menuEl = dom.querySelector(".drawer-menu");
    },
    view({state}) {
        return (<div className="drawer">
            <div className="drawer-topbar">
                <div className="drawer-burger" onclick={state.onOpenMenu}>MENU</div>
                <div className="drawer-topcontent">
                    {state.topChildren}
                </div>
            </div>    
            <div className="drawer-background" onclick={state.onCloseMenu}></div>
            <div className="drawer-container"
                    ontouchstart={state.onTouchStart}
                    ontouchmove={state.onTouchMove}
                    ontouchend={state.onTouchEnd}>
                <div className="drawer-menu">
                    {state.menuChildren}
                </div>
            </div>
        </div>);
    }
};