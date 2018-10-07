import camelcaseKeys from 'camelcase-keys';
import mass from '../../data/mass';
import {FILTER_MASS} from '../actions/mass';

const massList = camelcaseKeys(mass, {deep: true});
const initialState = {
  visibleList: massList,
};

const filterMass = (filter) => massList.filter((item) => {
  if (filter) {
    return item.value.search(filter) > -1 ||
      item.value.replace(/\s/g, '').search(filter) > -1;
  }
  return true;
});

export default (state = initialState, action) => {
  switch (action.type) {
    case FILTER_MASS:
      return {...state, visibleList: filterMass(action.filter)};
    default:
      return state;
  }
};
