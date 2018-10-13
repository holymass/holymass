import {createStore} from 'redux';
import rootReducer from './reducers';
import {__DEV__} from './utils';

const enhancer = __DEV__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

export default createStore(
    rootReducer,
    enhancer,
);
