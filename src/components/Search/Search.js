import React, {Component} from "react";
import style from './Search.css';
import * as PropTypes from "prop-types";
import Suggestions from "./Suggestions";
import Clear from "./Clear";
import SearchIcon from "./SearchIcon";

const DEFAULT_TIMEOUT = 500;
const MIN_CHARS = 1;

/*
* Search component - stateful component
* prepared for reusebilty
* TODO create defaultProps after rubicon review - there is no time now
* TODO improve component and export to npm package
*/
class Search extends Component{

    constructor(props){
        super(props);
        this.timeout = 0;

        this.state = {
            value : this.props.value,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSuggestions = this.handleSuggestions.bind(this);
        this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
        this.clearHandler = this.clearHandler.bind(this);
    }

    getActivityStyle() {
        if(this.state.value === undefined) return style.Neutral;
        if(this.state.value.length === 0){
            return style.Neutral;
        }else if(this.state.value.length < 3){
            return style.Inactive;
        }else if(this.state.value.length >= 3){
            return style.Active;
        }
    }

    getClear() {
        if(this.state.value === undefined || this.state.value.length === 0) return;
        return <Clear
            text={this.props.clear}
            clickHandler={this.clearHandler}/>;
    }

    clearHandler() {
        this.setState({value : ''});
        this.props.handleSearch('');
    }

    componentDidMount(){
        if (this.state.value !== undefined && this.state.value.length >= 3){
            this.handleSuggestions(this.state.value);
        }
    }

    handleChange(e) {
        let value = e.target.value;
        this.setState({value : value});

        if(this.props.handleSearch === undefined) return;

        if(value !== undefined && this.checkChars(value.length)){

            if(this.isTimeout()){
                this.handleTimeout(value);
            }else{
                this.props.handleSearch(value);
            }
        }

    }

    handleSuggestions(value) {
        if(this.props.handleSuggestions !== undefined){
            this.props.handleSuggestions(value);
        }
    }

    handleSuggestionClick(value) {
        this.setState({value : value});
        this.props.handleSearch(value);
        this.handleSuggestions(value);
    }

    handleTimeout(value) {
        if(this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.props.handleSearch(value);
            this.handleSuggestions(value);
        }, this.getTimeout());
    }

    isTimeout() {
        return this.props.timeout !== undefined;
    }
    getTimeout() {
        if(this.props.timeout !== undefined){
            return this.props.timeout;
        }
        return DEFAULT_TIMEOUT;
    }


    checkChars(length) {
        if(this.props.minChars !== undefined) {
            return length >= this.props.minChars;
        }
        return length >= MIN_CHARS;
    }

    render() {
        return (<div className={style.SearchHolder + ' ' + this.getActivityStyle()}>
                <div className={style.SearchBox}>
                    <div className={style.SearchIcon}><SearchIcon/></div>
                    <input value={this.state.value}
                           key={'search'}
                           type='text'
                           onChange={this.handleChange}
                           placeholder={this.props.placeholder}/>
                    {this.getClear()}
                </div>
                <Suggestions
                    words={this.props.suggestions}
                    onItemClickHandler={this.handleSuggestionClick}
                />
            </div>
        );
    }



}

//TODO improve this with defaults
Search.propTypes = {
    value : PropTypes.string,
    placeholder : PropTypes.string,
    handleSearch : PropTypes.func,
    handleSuggestions : PropTypes.func,
    timeout : PropTypes.number,
    minChars : PropTypes.number,
    suggestions : PropTypes.array,
    clear : PropTypes.string
};

export default Search;