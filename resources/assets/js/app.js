import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import Main from './components/Main';
import siteReducer from './components/store/reducers/siteReducers';
import vendorReducer from './components/store/reducers/vendorReducers';
import systemReducer from  './components/store/reducers/systemReducers';
import documentReducer from './components/store/reducers/documentReducer';


const rootReducer = combineReducers({
    site: siteReducer,
    vendor: vendorReducer,
    system: systemReducer,
    document: documentReducer
});


const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
    <Provider store={store}>
    <BrowserRouter>
        <Main />
    </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('app'));