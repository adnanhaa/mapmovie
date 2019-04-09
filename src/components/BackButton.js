import React from 'react'
import {Link} from "react-router-dom";

const BackButton = () => (
    <div className="btn-group" role="group" aria-label="First group">
        <Link className='btn btn-secondary btn-sm active' to='/'>Back</Link>
    </div>
);

export default BackButton;