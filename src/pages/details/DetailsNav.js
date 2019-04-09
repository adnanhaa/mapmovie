import React from 'react';
import BackButton from "../../components/BackButton";

const DetailsNav = () => {
    return <nav className="navbar border-top" style={{backgroundColor: '#29313e', paddingLeft: 4, paddingRight: 4}}>
        <div className="" style={{width:'100%', display: 'flex'}}>
            <div className="justify-content-between" style={{width:'100%', display: 'flex'}}>
                <div className="btn-group">
                    <BackButton/>
                </div>
                <div className="btn-group">
                    <div className="btn btn-secondary btn-sm">Videos</div>
                    <div className="btn btn-secondary btn-sm">Images</div>
                </div>
            </div>
        </div>
    </nav>
};

export default DetailsNav;