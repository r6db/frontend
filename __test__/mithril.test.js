import m from "mithril";
import { tidy } from "mithril-tidy";
import Component from "../src/app/components/misc/Searchbar";

test("can render the searchbar", () => {
    const selector = {
        get: () => "new mock data",
        set: jest.fn()
    };
    const comp = m(Component, { selector: selector });
    const html = tidy(comp);
    expect(html).toMatchSnapshot();
});