/*eslint-disable new-cap*/
import { Selector } from "testcafe";

const searchInput = Selector(".search-input input");

fixture(`browser test`)
    .page(`localhost:9000`);
    
test("displays search results", async t => {
    await t
        .typeText(searchInput, "Laxis")
        .pressKey("enter")
        .wait(1000)
        .expect(Selector(".playercard").count)
            .gte(2, "did not render at least 2 players");
});

test("can drag menu open", async t => {
    await t
        .resizeWindow(360, 640)
        // negative offsets in the options change the anchor to bottom right of the elememt
        .drag(Selector(".drawer-container"), 100, 0, { offsetX: -5, offsetY: -10 })
        .expect(Selector(".drawer").hasClass("is-open"))
        .ok();
});

test("can open menu with click", async t => {
    await t
        .resizeWindow(360, 640)
        .click(Selector(".drawer-burger"))
        .expect(Selector(".drawer").hasClass("is-open"))
        .ok();
});