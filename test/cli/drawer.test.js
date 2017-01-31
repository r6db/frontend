import "./setup";
import m from "mithril";
import { tidy } from "mithril-tidy";
import Drawer from "components/misc/Drawer";

const TestComp = {
    view() {
        return (
            <div className="content-wrapper">
                <Drawer>
                    testmenu
                </Drawer>
                <div className={"app is-test"}>app</div>
            </div>
        );
    }
};

describe("drawer", function () {
    it("renders into the dom", function () {

        const el = document.createElement("div");
        m.mount(el, TestComp);
        const node = el.querySelector(".drawer");
        expect(node).toBeDefined();
        m.mount(el, null);
    });

    it("has expected html", function () {
        const html = tidy(m(TestComp));
        expect(html).toMatchSnapshot();
    });

    it("triggers open on button click", function () {
        jest.useFakeTimers();
        
        const el = document.createElement("div");
        m.mount(el, TestComp);
        const drawer = el.querySelector(".drawer");
        const menu = drawer.querySelector(".drawer-menu");
        // click on 'menu' button
        el.querySelector(".drawer-burger").click();

        const bounds = menu.getBoundingClientRect();
        
        expect(drawer.className).toContain("is-open");
        el.querySelector(".drawer-burger").click();

    });
});
