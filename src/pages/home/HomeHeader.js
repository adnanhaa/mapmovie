import React from 'react'

/*
* this is page header
* - every page can contain own header and footer
*/
const HomeHeader = () => (
    <div className="alert alert-warning btn-toolbar mt-2 mb-0">
        <div className="justify-content-around"
             style={{width: '100%', display:'flex'}}>
            <a className={"btn btn-success btn-sm pointer text_white"}
               href="http://mapmovie.herokuapp.com/vue"
               target={'_blank'}>Vue.js version</a>
            <a className={"btn btn-danger btn-sm pointer text_white"}
               href="http://mapmovie.herokuapp.com/angular"
               target={'_blank'}>Angular version</a>
        </div>
    </div>
);

export default HomeHeader;