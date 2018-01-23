import * as Inferno from "inferno";
import { redirect } from "redux-first-router";
import { connect } from "inferno-redux";
import "./searchbar.scss";

interface ISearchbarAttrs {
    query: string;
    platform: string;
}
interface ISearchbarState {
    query: string;
    platform: string;
}

class Searchbar extends Inferno.Component<ISearchbarAttrs, ISearchbarState> {
    constructor(props) {
        super(props);
        this.state = {
            query: props.query || "",
            platform: props.platform,
        };
        this.onQueryChange = this.onQueryChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onQueryChange(e) {
        const query = e.target.value;
        this.setState({ query });
    }
    onSearch(e) {
        if (e && "preventDefault" in e) {
            e.preventDefault();
        }
        if (this.state.query.length > 2) {
            this.props.goSearch(this.state.query);
        } else {
            this.props.goHome();
        }
    }

    render() {
        return (
            <form className="searchbar" action="" onsubmit={this.onSearch}>
                <input
                    className="searchbar__name"
                    type="text"
                    value={this.state.query}
                    placeholder="enter player name"
                    onkeypress={this.onQueryChange}
                    onchange={this.onQueryChange}
                />
                <select
                    className="searchbar__platform"
                    value={this.props.platform}
                    onchange={e => this.props.setPlatform(e.value)}
                >
                    <option value="PC">PC</option>
                    <option value="PS4">PS4</option>
                    <option value="XBOX">XB1</option>
                </select>
                <button onsubmit={this.onSearch} className="button button--primary searchbar__submit">
                    Search
                </button>
            </form>
        );
    }
}

const mapStateToProps = getState => ({ platform: getState().platform, query: getState().search });
const mapDispatchToProps = (dispatch, getState) => ({
    goSearch: name => {
        const { platform, loading } = getState();
        if (!loading) {
            dispatch({ type: "SEARCH", payload: { query: name, platform } });
        }
    },
    goHome: () => dispatch({ type: "HOME" }),
    setPlatform: pl => dispatch({ type: "PLATFORM", payload: pl }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
