import * as React from "react";
import { connect } from "react-redux";
import "./searchbar.scss";
import { toSearch } from "lib/store/actions";

interface ISearchbarProps {
    query: string;
    platform: string;
    goSearch(query: string): any;
    goHome(): any;
    setPlatform(platform: string): any;
}
interface ISearchbarState {
    query: string;
    platform: string;
}

class Searchbar extends React.Component<ISearchbarProps, ISearchbarState> {
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
            <form className="searchbar" action="" onSubmit={e => this.onSearch(e)}>
                <input
                    className="searchbar__name"
                    type="text"
                    value={this.state.query}
                    placeholder="enter player name"
                    onChange={this.onQueryChange}
                />
                <select
                    className="searchbar__platform"
                    value={this.props.platform}
                    onChange={e => this.props.setPlatform((e.target as any).value)}
                >
                    <option value="PC">PC</option>
                    <option value="PS4">PS4</option>
                    <option value="XBOX">XB1</option>
                </select>
                <button onSubmit={this.onSearch} className="button button--primary searchbar__submit">
                    Search
                </button>
            </form>
        );
    }
}

const mapStateToProps = state => ({ platform: state.platform, query: state.search });
const mapDispatchToProps = dispatch => {
    return {
        goSearch: name => dispatch(toSearch(name)),
        goHome: () => dispatch({ type: "HOME" }),
        setPlatform: pl => dispatch({ type: "PLATFORM", payload: pl }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
