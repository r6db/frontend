import * as m from "mithril";
import Searchbar from "components/misc/Searchbar";
import Page from "components/misc/Page";
import Countdown from "components/misc/Countdown";
import "./home.scss";
import bg from "./bg.jpg";

const idRegex = /[\da-zA-Z]{8}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{4}-[\da-zA-Z]{12}/;

const showPlayer = id => e => page("/player/" + id);

export default {
    oncreate({ dom }) {
        const search = dom.querySelector(".searchbar__name");
        if (search && !window.ontouchstart) {
            search.focus();
        }
    },
    view({ attrs, state }) {
        return (
            <Page className="home">
                <Page.Head image={bg} position="50% 0%">
                    <div className="container">
                        <Searchbar className="home__search" search={attrs.search} />
                        <Countdown />
                    </div>
                </Page.Head>
            </Page>
        );
    },
};
