import React  from 'react';
import style from './App.css';
import {HashRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Footer from "./components/Footer";
import Translate from "./translate/Translate";
import NotFound from "./pages/notFound/notFound";
/*
* TODO :type/:id route is not good for future and some another routes
* Currently stateless component
*/
const App = () => {

    return <div className={style.App}>
            <HashRouter>
                <Translate>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        {/*<Route exact path='/:page' component={Home}/>*/}
                        <Route exact path='/shows' component={Home}/>
                        <Route exact path='/movies' component={Home}/>
                        <Route path='/:type/:id' component={Details}/>
                        <Route path='' component={NotFound}/>
                    </Switch>
                    <Footer/>
                </Translate>
            </HashRouter>
        </div>
};

export default App;