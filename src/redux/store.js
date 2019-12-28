import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// the middleware that the store expects from redux must be an array...
// sets the logger middleware and puts it inside an array...
const middlewares = [logger];

// create a store by passing in the root reducer, and the apply middleware that takes in all the values of the middlewares array...
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;