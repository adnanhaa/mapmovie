import {ApiConstants} from "../../services/api/apiConstants";
import React from "react";
import * as PropTypes from "prop-types";
import ItemImage from "./ItemImage";
import Rating from "../Rating";

const Item = props => {

    const { item } = props;

    let src = item.backdrop_path === null ? item.poster_path : item.backdrop_path;
    let fullPath = ApiConstants.IMAGE_BASE_URL + src;

    if(src == null){
        fullPath = "/img/noimage.jpg";
    }

    return <div className="card mb-2">
        <ItemImage src = {fullPath}/>

        <div className="card-body p-1">
            <div className="p-1">
                <div className="float-left mr-3">
                    <Rating rate={item.vote_average}/>
                </div>

                <div className="">
                    <h6 className="text-white mb-1">{item.title === undefined ? item.name : item.title}</h6>
                    <h6 className="text-white mb-0">24.12.2017.</h6>
                </div>
            </div>
        </div>
    </div>;
};

Item.propTypes = {
    item : PropTypes.object.isRequired
};

export default Item;