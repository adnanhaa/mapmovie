import style from './Clear.css';
import React, {useCallback} from "react";
import * as PropTypes from "prop-types";

/*
* local component - only for Search
* TODO create function after review
*/
const Clear = ({text, clickHandler}) => {

    const handleClick = useCallback(() => {
        clickHandler();
    }, []);

    return <div
        className={style.Clear}
        onClick={handleClick}>
        {text}
    </div>
};

//TODO improve this
Clear.defaultProps = { text: 'clear' };
Clear.propTypes = {
    text : PropTypes.string,
    clickHandler : PropTypes.func
};

export default Clear;
