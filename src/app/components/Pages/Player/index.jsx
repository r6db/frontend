import * as m from "mithril";
import Stats from "./stats";
import Operators from "./operators";
import Ranks from "./ranks";
import Tabs from "components/misc/Tabs";
import NotFound from "../Errors/NotFound";
import NoPlaytime from "../Errors/NoPlaytime";
import NoAliases from "../Errors/NoAliases";
import NoData from "../Errors/NoData";
import Header from "./Header";
import { connect } from "lib/store/connect";
import { updatePlayer } from "lib/store/actions";
import Page from "components/misc/Page";
import "./player.scss";

import background from "components/misc/Page/RB6_WhiteNoise_Teaser1.jpg";

const Player = {
    view({ attrs, state }) {
        if (attrs.loading) {
            return null;
        } else if (!attrs.data) {
            return <NotFound />;
        } else if (attrs.data.flags && attrs.data.flags.noPlaytime) {
            return <NoPlaytime {...attrs.data} />;
        } else if (attrs.data.flags && attrs.data.flags.noAliases) {
            return <NoAliases {...attrs.data} />;
        } else if (!attrs.data.stats || !attrs.data.rank) {
            return <NoData {...attrs.data} />;
        } else {
            return (
                <Page className={"player " + attrs.data.id}>
                    <Page.Head image={background}>
                        <Header
                            tab={attrs.tab}
                            platform={attrs.platform}
                            updatePlayer={attrs.updatePlayer}
                            {...attrs.data}
                        />
                    </Page.Head>
                    <Page.Content>
                        <div className="container player__tab">
                            {attrs.tab === "summary" ? <Stats key="summary" {...attrs.data} /> : null}
                            {attrs.tab === "ops" ? <Operators key="ops" {...attrs.data} /> : null}
                            {attrs.tab === "ranks" ? <Ranks key="ranks" {...attrs.data} /> : null}
                        </div>
                    </Page.Content>
                </Page>
            );
        }
    },
};

const mapStateToProps = getState => {
    const { platform, loading, players, location: { payload } } = getState();

    return {
        data: players[payload.id],
        tab: payload.tab || "summary",
        loading,
        platform,
    };
};
const mapDispatchtoProps = (dispatch, getState) => {
    const { location: { payload } } = getState();
    return {
        updatePlayer: () => dispatch(updatePlayer(payload.id)),
    };
};
export default connect(mapStateToProps, mapDispatchtoProps)(Player);
