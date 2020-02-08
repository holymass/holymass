import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import window from 'global';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import rootReducer from './reducers';
import getMetadata from './getMetadata';

const axiosClient = axios.create({
  baseURL: getMetadata('dataBaseURL'),
  responseType: 'json',
});

export default (preloadedState) => {
  const middleware = [thunk, axiosMiddleware(axiosClient)];
  const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
      window &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || // eslint-disable-line no-underscore-dangle
    compose;
  return createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware)),
  );
};
