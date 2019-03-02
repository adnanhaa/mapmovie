import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import Root from "./Root";
import {getStore} from "./_store/store";

const store = getStore();

ReactDOM.render(<Root store={store} />, document.getElementById('app'));

module.hot.accept();