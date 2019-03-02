import React from "react";
import * as PropTypes from "prop-types";

const Spinner = (props) => {
    return <div className='container mt-5'>
             <div className='row justify-content-center'>
                <div className=''>
                    <div className="spinner-grow text-primary" role="status"/>
                    <div className="spinner-grow text-secondary" role="status"/>
                    <div className="spinner-grow text-success" role="status"/>
                    <div className="spinner-grow text-danger" role="status"/>
                    <div className="spinner-grow text-warning" role="status"/>
                </div>
            </div>
            <div className='row mt-3 mb-5'>
                <div className='mx-auto text-center'> {props.text} </div>
            </div>
    </div>

};

Spinner.defaultProps = {
    text : 'Loading...'
};
Spinner.propTypes = {
    text : PropTypes.string
};

export default Spinner;