import React, {Component} from 'react'
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
/*
* this is app main or global header
* - every page can contain own header and footer instead
*/
class Header extends Component {

    isActive(link){
        return this.props.page === link ?
            'ml-2 btn btn-outline-primary btn-sm text_white active'
            : 'ml-2 btn btn-link btn-sm text_white ';
    }

    handleClick(e){
        if(this.props.handleClick){
            if(e === 'menu'){
                this.props.handleClick(true)
            }
        }
    }

    render() {
        return <header>
            <nav className="navbar " style={{backgroundColor: '#1A212C'}}>
                <div className="" style={{width: '100%', display: 'flex'}}>
                    <div className="btn btn-link btn-sm mr-1 pointer"
                         onClick={()=>this.handleClick('menu')}>
                        <i className="fas fa-bars fa-lg text_white"/>
                    </div>
                    <div className="justify-content-between" style={{width: '100%', display: 'flex'}}>
                        <div className="">
                            <Link
                                className={this.isActive('shows')}
                                to='/shows'>TV Shows</Link>
                            <Link
                                className={this.isActive('movies')}
                                to='/movies'>Movies</Link>
                        </div>
                    </div>
                    <div className="btn btn-link btn-sm mr-1 pointer"
                         onClick={this.handleClick('user')}>
                        <i className="fas fa-user fa-lg text_white"/>
                    </div>
                </div>
            </nav>
        </header>
    }
}


Header.propTypes = {
    page : PropTypes.string.isRequired,
    handleClick : PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        page : state.appReducer.page
    }
};

export default connect(mapStateToProps) (Header);
