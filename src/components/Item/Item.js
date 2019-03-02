import {ApiConstants} from "../../services/api/apiConstants";
import React from "react";
import * as PropTypes from "prop-types";
import ItemImage from "./ItemImage";

const Item = props => {

    const { item } = props;

    let src = item.backdrop_path === null ? item.poster_path : item.backdrop_path;
    let fullPath = ApiConstants.IMAGE_BASE_URL + src;

    if(src == null){
        fullPath = "/img/noimage.jpg";
    }

    return <div className="card mb-2">
        <ItemImage src = {fullPath}/>
        <div className="card-body p-3">
            <h5 className="card-title text-center text-dark">{item.title === undefined ? item.name : item.title}</h5>
        </div>
    </div>;
};

Item.propTypes = {
    item : PropTypes.object.isRequired
};

export default Item;