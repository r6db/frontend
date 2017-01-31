/*eslint-disable new-cap*/
import { Selector } from "testcafe";

const searchInput = Selector(".search-input input");

fixture(`browser test`)
    .page(`localhost:9000`);
    
test("can search players", async t => {
    await t
        .typeText(searchInput, "Laxis")
        .pressKey("enter")
        .takeScreenshot()
        .expect(Selector(".playercard").count)
            .gte(2, "did not render at least 2 players");
});

test("can drag menu open", async t => {
    await t
        .resizeWindow(360, 640)
        .drag(Selector(".drawer-container"), 100, 0, { offsetX: -5, offsetY: -10 })
        .wait(1000);
    await t.expect(Selector(".drawer").hasClass("is-open"))
        .ok();
});

test("can open menu with click", async t => {
    await t
        .resizeWindow(360, 640)
        .click(Selector(".drawer-burger"));
    
    await t.expect(Selector(".drawer").hasClass("is-open"))
        .ok();
});