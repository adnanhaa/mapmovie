import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

//@Deprecated
const FilterLink = ({ filter, children }) => (
    <NavLink
        to={filter === 'WEEK' ? '/' : `/${filter}`}
        activeStyle={{
            textDecoration: 'none',
            color: 'black'
        }}
    >
        {children}
    </NavLink>
);


FilterLink.propTypes = {
    filter: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default FilterLink;