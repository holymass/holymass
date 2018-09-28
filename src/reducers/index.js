import {combineReducers} from 'redux';
import massReducer from './mass';

const reducers = {
  mass: massReducer,
};

export default combineReducers(reducers);
