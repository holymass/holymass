import {
  FETCH_MASSES_OF_YEAR_A,
  FETCH_MASSES_OF_YEAR_B,
  FETCH_MASSES_OF_YEAR_C,
} from '../actions/mass';

const initialState = {
  A: [],
  B: [],
  C: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_MASSES_OF_YEAR_A}_SUCCESS`:
      return { ...state, A: action.payload.data };
    case `${FETCH_MASSES_OF_YEAR_B}_SUCCESS`:
      return { ...state, B: action.payload.data };
    case `${FETCH_MASSES_OF_YEAR_C}_SUCCESS`:
      return { ...state, C: action.payload.data };
    default:
      return state;
  }
};
