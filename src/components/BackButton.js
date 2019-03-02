import React from 'react'
import {Link} from "react-router-dom";

const BackButton = () => (
    <nav>
        <div className="btn-group mb-1" role="group" aria-label="First group">
            <Link className='btn btn-secondary active' to='/'>Back</Link>
        </div>
    </nav>
);

export default BackButton;