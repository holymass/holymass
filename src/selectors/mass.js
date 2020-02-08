import _orderBy from 'lodash/orderBy';
import _values from 'lodash/values';

export const selectByLiturgicalYear = (data, liturgicalYear) => {
  return _orderBy(_values(data[liturgicalYear].data), ['date'], ['desc']);
};
