import moment from 'moment';
import camelcaseKeys from 'camelcase-keys';
import { FETCH_MASSES, FETCH_NEXT_MASSES } from '../actions/mass';

const initialState = {
  data: {},
  next: true,
  total: 0,
};

export default (state = initialState, action) => {
  let data = [];
  switch (action.type) {
    case `${FETCH_MASSES}_SUCCESS`:
      data = camelcaseKeys(action.payload.data.data, { deep: true });
      for (const item of data) {
        item.date = moment(item.date).format('YYYY-MM-DD');
        state.data[item.id] = item;
      }
      return {
        ...state,
        next: action.payload.data.next,
        total: action.payload.data.total,
      };
    case `${FETCH_NEXT_MASSES}_SUCCESS`:
      return {
        ...state,
        data: camelcaseKeys(action.payload.data.data, { deep: true }),
      };
    default:
      return state;
  }
};
