import React, {Component} from "react";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import * as queryString from "query-string";
import {apiService} from "../../services/api/apiService";
import {appAction} from "../../_actions/appAction";
import Nav from "./Nav";
import Search from "../../components/Search/Search";
import List from "./List";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


/*
* Homepage component - main app logic
*/
class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            suggestions : []
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSuggestions = this.handleSuggestions.bind(this);

        this.unlisten = this.props.history.listen((location, action) => {
            if(action === "PUSH"){
                let qmParams = this.getQMParams(location.search);
                if(location.pathname === "/shows" && this.props.app.page !== "show"){
                    this.setPageWithFilters("shows", qmParams);
                }else if(location.pathname === "/movies" && this.props.app.page !== "movie"){
                    this.setPageWithFilters("movies", qmParams);
                }
            }
        });
    }

    getQMParams(params) {
        let filters = queryString.parse(params);
        return apiService.cleanFilters(filters);
    }

    async setPageWithFilters(page, filters) {
         await this.props.setPage(page);
         if(filters !== undefined && Object.keys(filters).length > 0){
             await this.props.setFilters(filters);
         }
         this.prepareFetchData();
    }

    prepareFetchData(value) {
        const {page, filters} = this.props.app;
        if(this.props.app.mode === 'view'){
            this.props.fetchDataFor(page, filters.period);
        }else if(this.props.app.mode === 'search'){
            if(value !== undefined){
                this.props.searchData(page, value);
            }else{
                this.props.searchData(page, this.props.app.search);
            }
        }
    }

    async handleSearch(value) {
        if(value.length >= 3){
            await this.setPageMode('search');
            await this.props.setSearchValue(value);
            this.prepareFetchData(value);
        }else{
            let reset = await this.setPageMode('view');
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

    render(){

        const { page, search } = this.props.app;
        const { period } = this.props.app.filters;

        return <div>

            {/*empty app header - page can contain own header*/}
            <Header/>

            <Nav
                page={page}
                period={period}/>
            <section>
                <Search
                    placeholder={'Search...'}
                    value={search}
                    handleSearch={this.handleSearch}
                    handleSuggestions={ this.handleSuggestions }
                    suggestions = {this.state.suggestions}
                    timeout={1000}
                />

                {/*list pull data from trendStore*/}
                <List/>
            </section>

            {/*empty app footer - page can contain own footer*/}
            <Footer/>
        </div>
    }

    componentDidMount() {
        const page = this.props.match.params.page;
        if(page === "movies" || page === "shows"){
            this.setPageWithFilters(page, this.getQMParams(this.props.location.search))
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
        params: PropTypes.shape({
            page: PropTypes.string
        })
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
        searchData: (page, value) => dispatch(apiService.searchData(page, value)),
        setSearchValue: (value) => dispatch(appAction.setSearchValue(value)),
        setMode: (mode) => dispatch(appAction.setMode(mode)),
        setPage: (page) => dispatch(appAction.setPage(page)),
        setFilters: (filters) => dispatch(appAction.setFilters(filters)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (Home);