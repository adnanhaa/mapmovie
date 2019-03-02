import {Component} from "react";
import React from "react";
import * as PropTypes from "prop-types";
import style from './ResponsiveEmbed.css';

/*
* Search component
* prepared for reusability
* only for knowledge showcase
* TODO - better solution is use <npm install react-player --save> instead this
* IMPORTANT it is stateless component with stateful implementation (wrong) but
* if we have more then one videos
* it is better to use state for switching video and controls for rendering
* */
class ResponsiveEmbed extends Component{

    render(){
        return <div className={style.Embed}>
            <iframe
                src = {this.getUrl()}
                frameBorder='0'
                allowFullScreen='1'
                width='auto'/>
        </div>
    }

    getUrl() {
        switch(this.props.site){
            case "YouTube" : return 'https://www.youtube.com/embed/'
                +this.props.id+'?autoplay=1';        //&enablejsapi=1&showinfo=0&controls=1&fs=1&wmode=transparent&amp;origin=http%3A%2F%2Flocalhost
        }
        return "";
    }

}

ResponsiveEmbed.propTypes = {
    site : PropTypes.string.isRequired,
    id : PropTypes.string.isRequired,
};

export default ResponsiveEmbed;