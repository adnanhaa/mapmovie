import React, {Component} from "react";
import * as PropTypes from "prop-types";

export const themes = {
    light: {
        foreground: '#176bff',
        background: '#eeeeee',
        boxShadow: '0 0 5px red'
    },
    dark: {
        foreground: '#ffffff',
        background: '#176bff',
    },
};

export const ThemeContext = React.createContext({
    theme: themes.dark,
    switchTheme: ()=>{}
});

export const withTheme = Component => props => (
    <ThemeContext.Consumer>
        {theme => <Component {...props} theme={theme}/>}
    </ThemeContext.Consumer>
);

class Theme extends Component{
    constructor(props){
        super(props);
         this.switchTheme = () => {
           this.setState(state => ({
               theme:
                   state.theme === themes.dark
                       ? themes.light
                       : themes.dark,
           }));
       };

        this.state = {
            theme: themes.light,
            switchTheme: this.switchTheme,
        };
    }

    render(){
        return <ThemeContext.Provider value={this.state}>
            {this.props.children}
        </ThemeContext.Provider>
    }
}

Theme.propTypes = {
    children: PropTypes.any
};


export default Theme;
