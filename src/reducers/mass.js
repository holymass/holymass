import {
  FETCH_MASSES_OF_YEAR_A,
  FETCH_MASSES_OF_YEAR_B,
  FETCH_MASSES_OF_YEAR_C,
} from '../actions/mass';

const initialState = {
  yearA: [],
  yearB: [],
  yearC: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_MASSES_OF_YEAR_A}_SUCCESS`:
      return { ...state, yearA: action.payload.data };
    case `${FETCH_MASSES_OF_YEAR_B}_SUCCESS`:
      return { ...state, yearB: action.payload.data };
    case `${FETCH_MASSES_OF_YEAR_C}_SUCCESS`:
      return { ...state, yearC: action.payload.data };
    default:
      return state;
  }
};
