import camelcaseKeys from 'camelcase-keys';
import {FETCH_RECENT_MASSES} from '../actions/mass';

export default (state = {}, action) => {
  switch (action.type) {
    case `${FETCH_RECENT_MASSES}_SUCCESS`:
      return {
        ...state,
        data: camelcaseKeys(action.payload.data.data, {deep: true}),
      };
    default:
      return state;
  }
};
