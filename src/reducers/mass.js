import camelcaseKeys from 'camelcase-keys';
import {FETCH_RECENT_MASSES, FILTER_MASSES} from '../actions/mass';

const filterMass = (filter) => {
  return getMassList().filter((item) => {
    if (filter) {
      return item.value.search(filter) > -1 ||
      item.value.replace(/\s/g, '').search(filter) > -1;
    }
    return true;
  });
};

export default (state = {}, action) => {
  switch (action.type) {
    case `${FETCH_RECENT_MASSES}_SUCCESS`:
      return {
        ...state,
        data: camelcaseKeys(action.payload.data.data, {deep: true}),
      };
    case FILTER_MASSES:
      return {...state, data: filterMass(action.filter)};
    default:
      return state;
  }
};
