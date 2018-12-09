import {changeLanguage} from 'i18next';
import {
  SET_LANGUAGE,
} from '../actions/settings';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      changeLanguage(action.language);
      return {...state, language: action.language};
    default:
      return state;
  }
};
