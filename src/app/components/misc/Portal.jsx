import * as m from "mithril";
/**
 * inline of npm package "mithril-portal"
 * licensed under MIT
 * https://github.com/vasilrimar/mithril-portal/tree/85a8f3f54ad0cf7a140a778cd98905ae672f27fe
 */
const Portal = {
    oncreate(vnode) {
        vnode.state.rootElement = null;
        vnode.state.content = null;
        const rootElement = document.createElement("div");
        document.body.appendChild(rootElement);
        this.rootElement = rootElement;
        this.content = { view: () => vnode.children };
        m.mount(this.rootElement, this.content);

        if (typeof vnode.attrs.onContentMount === "function") {
            vnode.attrs.onContentMount(rootElement);
        }
    },
    onbeforeupdate(vnode) {
        this.content.view = () => vnode.children;
    },
    onremove() {
        if (document.body.contains(this.rootElement)) {
            m.mount(this.rootElement, null);
            document.body.removeChild(this.rootElement);
        }
    },
    view() {
        return m.fragment({}, []);
    },
};

export default Portal;
