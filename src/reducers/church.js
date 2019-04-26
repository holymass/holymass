import camelcaseKeys from 'camelcase-keys';
import { FETCH_ALL_CHURCHES } from '../actions/church';

export default (state = {}, action) => {
  switch (action.type) {
    case `${FETCH_ALL_CHURCHES}_SUCCESS`:
      return {
        ...state,
        data: camelcaseKeys(action.payload.data.data, { deep: true }),
      };
    default:
      return state;
  }
};
