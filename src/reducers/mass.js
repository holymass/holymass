import {getMassList} from '../utils';
import {FILTER_MASS} from '../actions/mass';

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
    case FILTER_MASS:
      return {...state, visibleList: filterMass(action.filter)};
    default:
      return state;
  }
};
