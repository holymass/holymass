import moment from 'moment';
import camelcaseKeys from 'camelcase-keys';
import { FETCH_MASSES } from '../actions/mass';

const initialState = {
  data: {},
  next: true,
  total: 0,
  A: {
    data: {},
    next: true,
    total: 0,
  },
  B: {
    data: {},
    next: true,
    total: 0,
  },
  C: {
    data: {},
    next: true,
    total: 0,
  },
};

export default (state = initialState, action) => {
  let data = [];
  switch (action.type) {
    case `${FETCH_MASSES}_SUCCESS`:
      data = camelcaseKeys(action.payload.data.data, { deep: true });
      for (const item of data) {
        const liturgicalYear = item.solemnity.liturgicalYear;
        const current = state[liturgicalYear];
        item.date = moment(item.date).format('YYYY-MM-DD');
        current.data[item.id] = item;
        current.next = action.payload.data.next;
        current.total = action.payload.data.total;
      }
      return {...state};
    default:
      return state;
  }
};
