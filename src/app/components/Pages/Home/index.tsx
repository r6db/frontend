import * as Inferno from "inferno";
import Searchbar from "components/misc/Searchbar";
import Page, { PageHead, PageContent } from "components/misc/Page";
import "./home.scss";
import bg from "./bg.jpg";

const oncreate = () => {
    const search = document.querySelector(".home .searchbar__name") as HTMLInputElement;
    if (search && !window.ontouchstart) {
        search.focus();
    }
};

export default function(props) {
    return (
        <Page componentDidMount={oncreate} className="home">
            <PageHead image={bg} position="50% 0%">
                <div className="container">
                    <Searchbar className="home__search" search={props.search} />
                    <div className="home__disclaimer">
                        Old season ranks are *still* missing. <br />
                        Please yell at UBI, not us
                    </div>
                </div>
            </PageHead>
        </Page>
    );
}
