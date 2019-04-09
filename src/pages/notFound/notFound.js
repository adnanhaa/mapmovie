import React from "react";
import Header from "../../components/Header";

const NotFound = () => {
    return <div>
        <Header/>
        <div>404</div>
        <div>This page could not be found</div>
        <div>You will be redirected to homepage for <span>5</span> seconds</div>
        <div>In progress</div>
    </div>
};

export default NotFound;