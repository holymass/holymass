import _orderBy from 'lodash/orderBy';
import _values from 'lodash/values';

export default (data, liturgicalYear) => {
  return _orderBy(_values(data[liturgicalYear]), ['date'], ['desc']);
};
