import * as m from "mithril";
import Searchbar from "components/misc/Searchbar";
import Page from "components/misc/Page";
import "./home.scss";

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
                <Page.Head image="/assets/landing.jpg" top="0">
                    <div className="container">
                        <Searchbar className="home__search" search={attrs.search} />
                        <div className="home__disclaimer">
                            Old season ranks are *still* missing. <br />
                            Please yell at UBI, not us
                        </div>
                    </div>
                </Page.Head>
            </Page>
        );
    },
};
