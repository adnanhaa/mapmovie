import React, {Component} from 'react'
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";

class HomeNav extends Component {

    isPeriodActive(period) {
        if(this.props.page === 'movies' && this.props.movies === 'trending'){
            return this.props.period === period ?
                'btn btn-outline-primary btn-sm active' : 'btn btn-light btn-sm';
        }else if(this.props.page === 'shows' && this.props.shows === 'trending'){
            return this.props.period === period ?
                'btn btn-outline-primary btn-sm active' : 'btn btn-light btn-sm';
        }else{
            return 'btn btn-light btn-sm';
        }
    }

    isViewActive(view) {
        if(this.props.page === 'shows'){
            return this.props.shows === view ? 'btn btn-outline-primary btn-sm active' : 'btn btn-secondary btn-sm';
        }else if(this.props.page === 'movies'){
            return this.props.movies === view ? 'btn btn-outline-primary btn-sm active' : 'btn btn-secondary btn-sm';
        }else{
            return 'btn btn-secondary btn-sm';
        }
    }

    getThirdItem() {

        if(this.props.page === 'movies') {
            return <Link
                v-if="page === 'movies'"
                className={this.isViewActive('upcoming')}
                to={'/' + this.props.page + '?' + this.props.page + '=upcoming'}>Upcoming</Link>
        }else if(this.props.page === 'shows'){
            return <Link
                v-else-if="page === 'shows'"
                className={this.isViewActive('airing_today')}
                to={'/' + this.props.page + '?' + this.props.page + '=airing_today'}>Airing today</Link>
        }
    }

    render() {
        return <nav className={'navbar border-top'}
                    style={{backgroundColor: '#29313e', paddingLeft:5, paddingRight:5}}>
            <div className="btn-toolbar"
                 style={{width:'100%', display: 'flex'}}>
                <div className="justify-content-between"
                     style={{width:'100%', display: 'flex'}}>

                    <div className="btn-group">
                        <Link
                            className={this.isViewActive('popular')}
                            to={'/' + this.props.page + '?' + this.props.page + '=popular'}>Popular</Link>
                        <Link
                            className={this.isViewActive('top_rated')}
                            to={'/' + this.props.page + '?' + this.props.page + '=top_rated'}>Top rated</Link>

                        {this.getThirdItem()}
                    </div>
                    <div className="btn-group">
                        <Link
                            className={this.isPeriodActive('week')}
                            to={'/' + this.props.page + '?period=week'}>Week</Link>
                        <Link
                            className={this.isPeriodActive('day')}
                            to={'/' + this.props.page + '?period=day&items=10'}>Day</Link>

                    </div>
                </div>
            </div>
        </nav>
    }
}


HomeNav.propTypes = {
    page : PropTypes.string.isRequired,
    period : PropTypes.string.isRequired,
    movies : PropTypes.string.isRequired,
    shows : PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
    return {
        page : state.appReducer.page,
        period : state.appReducer.filters.period,
        shows : state.appReducer.filters.shows,
        movies : state.appReducer.filters.movies,
    }
};

export default connect(mapStateToProps) (HomeNav);