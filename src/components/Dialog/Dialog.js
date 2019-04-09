import {Component} from "react";
import React from "react";
import * as PropTypes from "prop-types";
import styles from './Dialog.css';

class Dialog extends Component {
    constructor(props){
        super(props);
        this.toggleDialog = this.toggleDialog.bind(this);
    }

    toggleDialog(e){
        e.stopPropagation();
        this.props.toggleDialog();
    }

    render() {
        return <div
            className={this.props.visibility === true ? styles.DialogWrapper : styles.DialogWrapperHidden}
            onClick={this.toggleDialog}>

            <div className={this.props.visibility === true? styles.Dialog : styles.DialogHidden}>
                {this.props.children}
            </div>
        </div>
    }
}

Dialog.propTypes = {
    title: PropTypes.string,
    visibility: PropTypes.bool,
    toggleDialog: PropTypes.func,
    children: PropTypes.any
};

export default Dialog;

/*
const style = {
    element.style {
    transform: translate3d(0px, 0px, 0px);
    z-index: 10002;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px;
    transition: transform 500ms cubic-bezier(0, 0, 0.25, 1) 0s, opacity 500ms cubic-bezier(0, 0, 0.25, 1) 0s;
}*/