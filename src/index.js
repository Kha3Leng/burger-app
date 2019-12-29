import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import orderReducer from './store/reducer/order';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import burgerBuilder from './store/reducer/burgerBuilder';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    order: orderReducer,
    burgerBuilder: burgerBuilder
});

const logger = store => {
    return next => {
        return action => {
            console.log("[ACTION] : ", action.type);
            console.log('[State] : ', store.getState());
            return next(action);
        }
    }
};

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk, logger)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
