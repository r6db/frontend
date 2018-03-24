import * as React from "react";
import Searchbar from "components/misc/Searchbar";
import Page, { PageHead, PageContent } from "components/misc/Page";
import Favorites from "./Favorites";
import Ad from "components/misc/Ad";
import "./home.scss";

import backgrounds from "assets/backgrounds/outbreak1.jpg";

const oncreate = () => {
    const search = document.querySelector(".home .searchbar__name") as HTMLInputElement;
    if (search && !window.ontouchstart) {
        search.focus();
    }
};

export default function(props) {
    return (
        <Page className="home">
            <PageHead image={backgrounds} position="50% 0%">
                <div className="container">
                    <Searchbar className="home__search" search={props.search} />
                    <Favorites />
                    <Ad slot="7116683052" />
                    {/* <div className="home__disclaimer">
                    </div> */}
                </div>
            </PageHead>
        </Page>
    );
}
