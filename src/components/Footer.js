import React from 'react'


/*
* this is app main or global footer
* - every page can contain own header and footer instead
*/
const Footer = () => (
    <footer className="mt-3">
        <nav className="navbar " style={{backgroundColor: '#1A212C'}}>
            <div className="" style={{width:'100%', display: 'flex', flexDirection: 'column'}}>
                <div className="justify-content-center" style={{width:'100%', display: 'flex'}}>
                    <h6 className="text_white">developement in progress</h6>
                </div>
                <div className="justify-content-center" style={{width:'100%', display: 'flex'}}>
                    <h6 className="text_white">footer</h6>
                </div>
            </div>
        </nav>
    </footer>
);

export default Footer