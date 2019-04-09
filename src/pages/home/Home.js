import React, {Component} from "react";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import * as queryString from "query-string";
import {apiService} from "../../services/api/apiService";
import {appAction} from "../../_actions/appAction";
import HomeNav from "./HomeNav";
import Search from "../../components/Search/Search";
import List from "./List";
import HomeHeader from "./HomeHeader";
import Dialog from "../../components/Dialog/Dialog";
import Header from "../../components/Header";
import {withTranslate} from "../../translate/Translate";

/*
* Homepage component - main app logic
*/
const SHOWS = 'shows';
const MOVIES = 'movies';
const TRENDING = 'trending';


class Home extends Component{

    constructor(props){
        super(props);
       // console.log(this);
        // Search and Suggestions components can be connected with store or
        // can fetch the data yourself but they must be 100% clear for new npm modul
        // Something like dependency injection

       /* this.switchTheme = () => {
            this.setState(state => ({
                theme:
                    state.theme === themes.dark
                        ? themes.light
                        : themes.dark,
            }));
        };*/

        this.state = {
            suggestions : [],
            dialogState: false,
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSuggestions = this.handleSuggestions.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);

        this.unlisten = this.props.history.listen((location, action) => {
            if(action === "PUSH"){
                let qmParams = this.getQMParams(location.search);
                if(location.pathname === "/shows" && this.props.app.page !== SHOWS){
                    this.setPageWithFilters(SHOWS, qmParams);
                }else if(location.pathname === "/movies" && this.props.app.page !== MOVIES){
                    this.setPageWithFilters(MOVIES, qmParams);
                }else{
                    this.checkActiveFilters(qmParams);
                }
            }
        });
    }

    getQMParams(params) {
        let filters = queryString.parse(params);
        if(filters.period !== undefined){
            if(this.props.app.page === SHOWS) filters.shows = TRENDING;
            if(this.props.app.page === MOVIES) filters.movies = TRENDING;
        }
        return apiService.cleanFilters(filters);
    }

    checkActiveFilters(nextFilters) {
         if(this.checkFilters(nextFilters)){
             const {page, filters} = this.props.app;
             if(nextFilters[page] !== undefined){
                 if(nextFilters[page] !== filters[page]){
                     this.updateFiltersParams(nextFilters);
                 }else if(nextFilters[page] === TRENDING){
                     if(nextFilters['period'] !== filters.period){
                         this.updateFiltersParams(nextFilters);
                     }
                 }
             }
         }
    }

    async updateFiltersParams(nextFilters) {
        await this.props.setFilters(nextFilters);
        this.prepareFetchData();
    }

    checkFilters(filters) {
        return filters !== undefined && Object.keys(filters).length > 0;
    }

    async setPageWithFilters(page, filters) {
         await this.props.setPage(page);
         if(filters !== undefined && Object.keys(filters).length > 0){
             await this.props.setFilters(filters);
         }
         this.prepareFetchData();
    }

    prepareFetchData(value) {
        const {page, mode, filters} = this.props.app;

        if(mode === 'view'){
            if(page === SHOWS){
                if(filters.shows === TRENDING){
                    this.props.fetchDataFor(page, filters.period);
                }else{
                    this.props.fetchDataBy(page, filters.shows);
                }
            }else if(page === MOVIES){
                if(filters.movies === TRENDING){
                    this.props.fetchDataFor(page, filters.period);
                }else{
                    this.props.fetchDataBy(page, filters.movies);
                }
            }
        }else if(mode === "search"){
            if(value !== undefined){
                this.props.searchData(page, value);
            }else{
                this.props.searchData(page, this.props.app.search);
            }
        }
    }

    async handleSearch(value) {
        if(value.length >= 3){
            await this.setPageMode("search");
            await this.props.setSearchValue(value);
            this.prepareFetchData(value);
        }else{
            let reset = await this.setPageMode("view");
            this.setState({suggestions : []});
            if(reset || value.length === 0){
                this.prepareFetchData();
            }
        }
    }

    handleSuggestions(value) {
        if(value.length >= 3){
            apiService.fetchKeywords(value)
                .then(response => response.json())
                .then(data => {
                    let suggestions = data.results.length > 5 ? data.results.slice(0, 5) : data.results;
                    this.setState({suggestions : suggestions});
                   // console.log(suggestions);
                });
        }
    }

    setPageMode(mode) {
        if(mode !== this.props.app.mode){
            this.props.setMode(mode);
            return true;
        }
    }

    toggleDialog() {
        this.setState({dialogState : !this.state.dialogState});
    }

    render(){

        const { search } = this.props.app;

        return <div>
                <Header handleClick={this.toggleDialog}/>
                <HomeNav/>
                {/*<SwitchTheme />*/}
                <section className={'main content'}>
                    <HomeHeader/>
                    {
                    // Search and Suggestions components can be connected with store or
                    // can fetch the data yourself but they must be 100% independent for new npm modul
                    }
                    <Search
                        placeholder={"Search..."}
                        value={search}
                        handleSearch={this.handleSearch}
                        handleSuggestions={ this.handleSuggestions }
                        suggestions = {this.state.suggestions}
                        timeout={1000} />
                    {/*list pull data from trendStore*/}
                    <List/>
                </section>

                <Dialog visibility={this.state.dialogState} toggleDialog={this.toggleDialog}>
                    <h2>Dialog Modal</h2>
                </Dialog>
            </div>
    }

    componentDidMount() {
        const path = this.props.match.path;
        if(path.includes(MOVIES) === true){
            this.setPageWithFilters(MOVIES, this.getQMParams(this.props.location.search))
        }else if(path.includes(SHOWS) === true){
            this.setPageWithFilters(SHOWS, this.getQMParams(this.props.location.search))
        }else{
            this.prepareFetchData();
        }
    }

    /**
     *Unlisten history listener - IMPORTANT!!!
     */
    componentWillUnmount(){
        this.unlisten();
    }


}


Home.propTypes = {
    match: PropTypes.shape({
        path: PropTypes.string
    }),
    location: PropTypes.shape({
        search: PropTypes.string
    }),
    history: PropTypes.shape({
        listen: PropTypes.func.isRequired
    }),
    app : PropTypes.shape({
        page: PropTypes.string,
        mode: PropTypes.string,
        search: PropTypes.string,
        filters: PropTypes.object,
    }).isRequired,
    fetchDataFor: PropTypes.func.isRequired,
    fetchDataBy: PropTypes.func.isRequired,
    searchData: PropTypes.func.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    setMode: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired,
    setFilters: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
    return {
        app : state.appReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDataFor: (page, period) => dispatch(apiService.fetchDataFor(page, period)),
        fetchDataBy: (page, view) => dispatch(apiService.fetchDataBy(page, view)),
        searchData: (page, value) => dispatch(apiService.searchData(page, value)),
        setSearchValue: (value) => dispatch(appAction.setSearchValue(value)),
        setMode: (mode) => dispatch(appAction.setMode(mode)),
        setPage: (page) => dispatch(appAction.setPage(page)),
        setFilters: (filters) => dispatch(appAction.setFilters(filters)),
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withTranslate(Home));