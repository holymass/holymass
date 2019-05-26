import _orderBy from 'lodash/orderBy';
import _values from 'lodash/values';

export const dataSelector = (state) => {
  return _orderBy(_values(state.mass.data), ['date'], ['desc']);
};
