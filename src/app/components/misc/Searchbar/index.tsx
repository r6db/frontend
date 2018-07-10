import * as React from "react";
import { connect } from "react-redux";
import { toSearch } from "lib/store/actions";
import Icon, { GLYPHS } from "components/misc/Icon";

import "./searchbar.scss";

interface ISearchbarProps {
    className?: string;
    query: string;
    platform: string;
    focused: boolean;
    goSearch(query: string): any;
    goHome(): any;
    updateSearch(query: string): any;
    setPlatform(platform: string): any;
}
interface ISearchbarState {
    didEdit: boolean;
}

class Searchbar extends React.PureComponent<ISearchbarProps, ISearchbarState> {
    searchbar: HTMLInputElement;
    constructor(props) {
        super(props);
        this.state = {
            didEdit: false
        };
        this.onSearch = this.onSearch.bind(this);
    }
    onSearch(e) {
        if (e && "preventDefault" in e) {
            e.preventDefault();
        }
        if (this.props.query.length > 2) {
            this.props.goSearch(this.props.query);
        } else {
            this.props.goHome();
        }
    }
    componentDidMount(){
        if(this.props.focused) {
            this.searchbar.focus(); 
        }
    }

    render() {
        return (
            <form className={`searchbar ${this.props.className || ''}`} action="" onSubmit={e => this.onSearch(e)}>
                <div className="searchbar__box">
                    <input
                        className="searchbar__input"
                        type="text"
                        value={this.props.query}
                        placeholder="Search for players..."
                        onChange={e => this.props.updateSearch(e.target.value)}
                        ref={(input) => { this.searchbar = input; }}
                        minLength={3}
                    />
                    <button onSubmit={this.onSearch} className="searchbar__submit">
                        <Icon glyph={GLYPHS.ARROWRIGHT} />
                    </button>
                </div>
                <div className={`searchbar__platform ${this.props.platform || ''}`}>
                    <select
                        className="searchbar__platform__select"
                        value={this.props.platform}
                        onChange={e => this.props.setPlatform((e.target as any).value)}
                    >
                        <option value="PC">PC</option>
                        <option value="PS4">PS4</option>
                        <option value="XBOX">XB1</option>
                    </select>
                    <div className="searchbar__platform__arrow"><Icon glyph={GLYPHS.CHEVRONDOWN} /></div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => ({ platform: state.platform, query: state.search });
const mapDispatchToProps = dispatch => {
    return {
        goSearch: name => dispatch(toSearch(name)),
        goHome: () => dispatch({ type: "HOME" }),
        updateSearch: query => dispatch({ type: "QUERY", payload: query}),
        setPlatform: pl => dispatch({ type: "PLATFORM", payload: pl }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
