import {changeLanguage} from 'i18next';
import {
  SET_LANGUAGE,
  SET_LITURGICAL_YEAR,
} from '../actions/settings';

const initialState = {
  language: localStorage.i18nextLng || 'en',
  liturgicalYear: localStorage.liturgicalYear ||'yearB',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      changeLanguage(action.language);
      return {...state, language: action.language};
    case SET_LITURGICAL_YEAR:
      localStorage.setItem('liturgicalYear', action.year);
      return {...state, liturgicalYear: action.year};
    default:
      return state;
  }
};
