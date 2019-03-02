import React from "react";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Item from "../../components/Item/Item";
import Spinner from "../../components/Spinner";
import ErrorView from "../../components/ErrorView";

const List = props => {

    const {page} = props.app;
    const {isLoading, error, items} = props.trending;


    if(isLoading){
        return <Spinner/>
    }

    if(error != null){
        return <ErrorView message={'Oops... '+ error}/>
    }

    return <div>
        <ul>
            <div className="row">
                {items.map(item =>
                    <Link
                        className="col-sm-6 col-xs-12"
                        to={'/' + page + '/' + item.id} key={item.id}>
                        <Item item = {item}/>
                    </Link>
                )}
            </div>
        </ul>
    </div>;
}


List.propTypes = {
    trending : PropTypes.shape({
        isLoading: PropTypes.bool,
        error: PropTypes.string,
        items: PropTypes.array.isRequired,
        loadedAt: PropTypes.number,
        string: PropTypes.string,
        url: PropTypes.string,
    }).isRequired,
    app : PropTypes.shape({
        page: PropTypes.string,
        period: PropTypes.string,
    }).isRequired
};


function mapStateToProps(state) {
    return {
        app : state.appReducer,
        trending : state.trendReducer,
    }
}

export default connect(mapStateToProps) (List);