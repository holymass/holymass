import {
  FETCH_MASSES_OF_YEAR_A,
  FETCH_MASSES_OF_YEAR_B,
  FETCH_MASSES_OF_YEAR_C,
} from '../actions/mass';
import patchPinyin from '../utils/patchPinyin';

const initialState = {
  yearA: [],
  yearB: [],
  yearC: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_MASSES_OF_YEAR_A}_SUCCESS`:
      return { ...state, yearA: patchPinyin(action.payload.data) };
    case `${FETCH_MASSES_OF_YEAR_B}_SUCCESS`:
      return { ...state, yearB: patchPinyin(action.payload.data) };
    case `${FETCH_MASSES_OF_YEAR_C}_SUCCESS`:
      return { ...state, yearC: patchPinyin(action.payload.data) };
    default:
      return state;
  }
};
