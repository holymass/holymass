import { FETCH_CHURCHES } from '../actions/church';

export default (state = {}, action) => {
  switch (action.type) {
    case `${FETCH_CHURCHES}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};
