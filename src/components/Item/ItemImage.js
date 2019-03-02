import React from "react";
import * as PropTypes from "prop-types";

const ItemImage = props => {
    return <img
        className="card-img-top"
        src={props.src}
        alt="Card image cap"/>
};

ItemImage.propTypes = {
    src : PropTypes.string.isRequired
};

export default ItemImage;
