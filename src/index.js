import React from 'react';
import ReactDOM from 'react-dom';
import ShoppingApp from './ShoppingApp';
import ShoppingAppReducer from './reducers/ShoppingAppReducer'
import './index.css'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const store = createStore(ShoppingAppReducer, applyMiddleware(thunk, logger))

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ShoppingApp />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
