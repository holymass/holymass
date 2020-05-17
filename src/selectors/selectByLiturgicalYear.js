import _orderBy from 'lodash/orderBy';
import _values from 'lodash/values';

export default (data, liturgicalYear, filter) => {
  const filteredData = filter
    ? data[liturgicalYear].filter((item) => {
        const f = filter.toLowerCase();
        return (
          item.pinyin1.indexOf(f) > -1 ||
          item.pinyin2.indexOf(f) > -1 ||
          item.pinyin3.indexOf(f) > -1 ||
          item.pinyin4.indexOf(f) > -1 ||
          item.name.indexOf(f) > -1
        );
      })
    : data[liturgicalYear];
  return _orderBy(_values(filteredData), ['date'], ['desc']);
};
