import React from "react";
import * as PropTypes from "prop-types";
import style from './Search.css';

/*
* local component - only for Search
*/
function Suggestions (props) {

    if(props.words === undefined){
        return<div/>;
    }

    return <ul className={style.Suggestions}>
        {props.words.map(word =>{
            return <li key={word.id}
                       onClick={()=> props.onItemClickHandler(word.name)}>
                {word.name}
            </li>
        })}
    </ul>
}

Suggestions.propTypes = {
    words : PropTypes.array,
    onItemClickHandler : PropTypes.func
};

export default Suggestions