import * as React from "react";
import { hot } from "react-hot-loader";
import Searchbar from "components/misc/Searchbar";
import Icon, { GLYPHS } from "components/misc/Icon";
import Page, { PageHead } from "components/misc/Page";
import "./home.scss";

import background from "assets/backgrounds/parabellum1.jpg";

const oncreate = () => {
    const search = document.querySelector(
        ".home .searchbar__name"
    ) as HTMLInputElement;
    if (search && !window.ontouchstart) {
        search.focus();
    }
};

function Home(props) {
    return (
        <Page className="home">
            <PageHead image={background} position="75% 25%" opacity={0.3}>
                <div className="home__content container">
                    <Icon className="home__logo" glyph={GLYPHS.LOGO} />
                    <Searchbar
                        className="home__search"
                        search={props.search}
                        focused={true}
                    />
                    {/* <div className="blocker" /> */}
                </div>
            </PageHead>
        </Page>
    );
}

export default hot(module)(Home);
