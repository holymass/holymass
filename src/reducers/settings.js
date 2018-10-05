import {changeLanguage} from 'i18next';
import {CHANGE_LANGUAGE} from '../actions/settings';

const initialState = {
  language: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {...state, language: changeLanguage(action.language)};
    default:
      return state;
  }
};
