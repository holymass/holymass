import {combineReducers} from 'redux';
import massReducer from './mass';
import settingsReducer from './settings';

const reducers = {
  mass: massReducer,
  settings: settingsReducer,
};

export default combineReducers(reducers);
