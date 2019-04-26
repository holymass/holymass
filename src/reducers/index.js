import { combineReducers } from 'redux';
import churchReducer from './church';
import massReducer from './mass';
import settingsReducer from './settings';

const reducers = {
  church: churchReducer,
  mass: massReducer,
  settings: settingsReducer,
};

export default combineReducers(reducers);
