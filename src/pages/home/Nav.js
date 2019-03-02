import React from 'react'
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";

const Nav = props => (
    <nav>
        <div className="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group" role="group" aria-label="First group">
                <Link
                    className={"btn btn-secondary " + (props.page === 'shows' ? 'active' :'')}
                    to='/shows'>TV Shows</Link>
                <Link
                    className={"btn btn-secondary " + (props.page === 'movies' ? 'active' :'')}
                    to='/movies'>Movies</Link>
            </div>


            <div className="btn-group" role="group" aria-label="First group">
                <Link
                    className={"btn btn-light " + (props.period === 'week' ? 'active' :'')}
                    to={'/' + props.page + '?period=week'}>Week</Link>
                <Link
                    className={"btn btn-light " + (props.period === 'day' ? 'active' :'')}
                    to={'/' + props.page + '?period=day&items=10'}>Day</Link>
            </div>
        </div>
    </nav>
);

Nav.propTypes = {
    page : PropTypes.string.isRequired,
    period : PropTypes.string.isRequired
};

export default Nav;