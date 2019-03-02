import React  from 'react';
import style from './App.css';
import {HashRouter} from "react-router-dom";
import {Route} from "react-router";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
/*
* TODO :type/:id route is not good for future and some another routes
* Currently stateless component
*/
const App = () => {
    return <div className={style.Main} >
        <div className='container'>
            <HashRouter>
                <div>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/:page' component={Home}/>
                    <Route path='/:type/:id' component={Details}/>
                </div>
            </HashRouter>
        </div>
    </div>
};

export default App;