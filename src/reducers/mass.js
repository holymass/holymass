import camelcaseKeys from 'camelcase-keys';
import {FETCH_MASSES, FETCH_NEXT_MASSES} from '../actions/mass';

export default (state = {}, action) => {
  switch (action.type) {
    case `${FETCH_MASSES}_SUCCESS`:
      return {
        ...state,
        data: camelcaseKeys(action.payload.data.data, {deep: true}),
        page: action.payload.config.params.page,
      };
    case `${FETCH_NEXT_MASSES}_SUCCESS`:
      return {
        ...state,
        data: camelcaseKeys(action.payload.data.data, {deep: true}),
      };
    default:
      return state;
  }
};
