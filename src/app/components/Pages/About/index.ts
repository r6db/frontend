import Inferno from "inferno";
import Page from "components/misc/Page";

const About: m.Component<{}, {}> = {
    view() {
        return m(Page, [
            m(Page.Head, {}, [m(".container", [m("h1.header", "About")])]),
            m(Page.Content, [m(".container", [])]),
        ]);
    },
};

export default About;
