import { SET_LANGUAGE } from '../actions/settings';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return { ...state, language: action.language };
    default:
      return state;
  }
};
