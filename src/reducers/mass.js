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

const addPinyin = (data) => {
  return data.map((item) => {
    const temp1 = item.pinyin.replace(/\d/g, '');
    const temp2 = item.pinyin.split(' ').map((x) => x[0]);
    return {
      ...item,
      pinyin1: temp1.replace(/\s/g, ''),
      pinyin2: temp1.replace(/\s/g, "'"),
      pinyin3: temp2.join(''),
      pinyin4: temp2.join("'"),
    };
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_MASSES_OF_YEAR_A}_SUCCESS`:
      return { ...state, yearA: addPinyin(action.payload.data) };
    case `${FETCH_MASSES_OF_YEAR_B}_SUCCESS`:
      return { ...state, yearB: addPinyin(action.payload.data) };
    case `${FETCH_MASSES_OF_YEAR_C}_SUCCESS`:
      return { ...state, yearC: addPinyin(action.payload.data) };
    default:
      return state;
  }
};
