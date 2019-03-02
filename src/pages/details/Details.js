import React, {Component} from "react";
import * as PropTypes from "prop-types";
import {ApiConstants} from "../../services/api/apiConstants";
import BackButton from "../../components/BackButton";
import ResponsiveEmbed from "../../components/ResponsiveEmbed/ResponsiveEmbed";
import {apiService} from "../../services/api/apiService";
import Spinner from "../../components/Spinner";
import ErrorView from "../../components/ErrorView";
import ItemImage from "../../components/Item/ItemImage";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

/*
* Detail wrapper page component
*/
class Details extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading : true,
            item : null,
            videos : [],
            error : null
        }
    }

    componentDidMount(){
        const { type, id } = this.props.match.params;

        let promise = apiService.fetchItemDetails(type, id);
        if(promise !== null){
            promise
                .then(this.handleErrors)
                .then(data => {
                    this.setState({isLoading : false, error : false, item : data});
                })
                .catch(error =>{
                    this.setState({isLoading : false, error : error.message, item : null});
                });
        }else {
            this.setState({error : true, isLoading : false});
        }


        let videoPromise = apiService.fetchItemVideos(type, id);
        if(videoPromise !== null){
            videoPromise
                .then(this.handleErrors)
                .then(data => {
                    this.setState({videos : data.results});
                })
        }
    }

    handleErrors(response) {
        if (response.status_message){
            throw Error(response.status_message);
        }
        return response;
    }

    render(){
        return <div>
            {/*empty app header - page can contain own header*/}
            <Header/>
                <section>
                    {this.getContent()}
                </section>
            {/*empty app footer - page can contain own footer*/}
            <Footer/>
        </div>
    }

    getContent(){

        const {isLoading, item, error} = this.state;

        if(isLoading) {
            return <div>
                <BackButton/>
                <Spinner text={'Loading...'}/>
            </div>;
        }else if(error) {
            return <div>
                <BackButton/>
                <ErrorView message={'Oops... ' + error}/>
            </div>
        }else{
            if(item !== null) {
                return <div>
                    <BackButton/>
                    {/*extract to Card components by types*/}
                    <div className="card">
                        {this.getImgOrVideo()}
                        <div className="card-body">
                            <h4 className="card-title">{item.title === undefined ? item.name : item.title}</h4>
                            <p className="card-text">{item.overview}</p>
                        </div>
                    </div>
                </div>
            }else{
                return <div>
                    <BackButton/>
                    <ErrorView message={'Oops... Something went wrong... please refresh'}/>
                </div>
            }
        }
    }


    getImgOrVideo() {
        if(this.state.videos.length > 0 && this.state.videos[0] !== undefined){
            return this.getVideo();
        }
        return this.getImg();
    }

    getVideo() {
        const video = this.state.videos[0];
       // console.log(video);
        return <ResponsiveEmbed site ={video.site} id={video.key}/>
    }

    getImg() {

        const {item} = this.state;

        let src = item.backdrop_path === null ? item.poster_path : item.backdrop_path;
        let fullPath = ApiConstants.IMAGE_BASE_URL + src;

        if(src == null){
            fullPath = "/img/noimage.jpg";
        }

        return <ItemImage src={fullPath}/>;
    }
}

Details.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            type: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        })
    })
};

export default Details;