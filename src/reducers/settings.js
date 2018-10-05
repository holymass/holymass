import {changeLanguage} from 'i18next';
import {CHANGE_LANGUAGE} from '../actions/settings';

const initialState = {
  language: localStorage.i18nextLng || 'en',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      changeLanguage(action.language);
      return {...state, language: action.language};
    default:
      return state;
  }
};
