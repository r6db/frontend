import * as m from "mithril";
import Result from "./Result";
import Media from "components/misc/Media";
import Page from "components/misc/Page";
import { connect } from "lib/store/connect";
import "./search.scss";

const Search = {
    view({ attrs, state }) {
        if (attrs.loading) {
            return "";
        }
        return m(Page, { className: "search" }, [
            m(Page.Head, [
                m(".container", [
                    m(".header", [
                        `Search ${attrs.search} `,
                        m("span.saerch__resultcount.header.header--small.header--subtle", [
                            `${attrs.result.length} result(s)`,
                        ]),
                    ]),
                ]),
            ]),
            m(Page.Content, [
                m(".container.container--small", [
                    m(
                        ".search__results",
                        attrs.result.length > 0
                            ? attrs.result.map(player => m(Result, { player, key: player.id }))
                            : m(Media, { title: "no results" }, "we could not find any players matching that query."),
                    ),
                ]),
            ]),
        ]);
    },
};

const mapStateToProps = getState => {
    const { platform, loading, search, searchResults } = getState();
    return {
        loading,
        result: searchResults[search] || [],
        search,
        platform,
    };
};

export default connect(mapStateToProps)(Search);
