import {applyMiddleware, combineReducers, createStore} from "redux";
import appReducer from "../_reducers/appReducer";
import trendReducer from "../_reducers/trendReducer";
import thunk from "redux-thunk";

const rootReducers = combineReducers({
    appReducer: appReducer,
    trendReducer: trendReducer
});


//  UNCOMMENT this for REDUX Chrome extension and
//  SET composer like second parameter in createStore function

/*const composer = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);*/

export function getStore() {
    return createStore(rootReducers, applyMiddleware(thunk));
}