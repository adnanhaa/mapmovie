import React, {Component} from "react";
import * as PropTypes from "prop-types";

export const translations = {
    en: {
        title: 'title',
        back: 'back',
        close: 'close'
    },
};

export const TranslateContext = React.createContext({
    translation: translations.en,
    switchLanguage: ()=>{}
});

export const withTranslate = Component => {
    const TranslateComponent = props => (
        <TranslateContext.Consumer>
            {translation => <Component {...props} {...translation}/>}
        </TranslateContext.Consumer>
    );
    TranslateComponent.displayName = 'oki';
    return TranslateComponent;
};

class Translate extends Component{
    constructor(props){
        super(props);
         this.switchLanguage = () => {
           this.setState(state => ({
               translation:
                   state.translation === translations.en
                       ? translations.de
                       : translations.en,
           }));
       };

        this.state = {
            translation: translations.en,
            switchLanguage: this.switchLanguage,
        };
    }

    render(){
        return <TranslateContext.Provider value={this.state}>
            {this.props.children}
        </TranslateContext.Provider>
    }
}

Translate.propTypes = {
    children: PropTypes.any.isRequired
};



export default Translate;
