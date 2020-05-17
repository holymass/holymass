import _orderBy from 'lodash/orderBy';
import _values from 'lodash/values';

export default (data, liturgicalYear, filter) => {
  const filteredData = filter
    ? data[liturgicalYear].filter((item) => {
        return (
          item.pinyin1.indexOf(filter) > -1 ||
          item.pinyin2.indexOf(filter) > -1 ||
          item.pinyin3.indexOf(filter) > -1 ||
          item.pinyin4.indexOf(filter) > -1 ||
          item.name.indexOf(filter) > -1
        );
      })
    : data[liturgicalYear];
  return _orderBy(_values(filteredData), ['date'], ['desc']);
};
