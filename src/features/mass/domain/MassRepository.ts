import Mass from './Mass';
import _filter from 'lodash/filter';
import _sortBy from 'lodash/sortBy';
import _take from 'lodash/take';
import _union from 'lodash/union';
import liturgicalYearA from '../../../../public/data/mass/a.json';
import liturgicalYearB from '../../../../public/data/mass/b.json';
import liturgicalYearC from '../../../../public/data/mass/c.json';

const store = _sortBy(
  _union(liturgicalYearA, liturgicalYearB, liturgicalYearC),
  ['date'],
).map(
  (item) =>
    new Mass(
      item.date,
      item.firstReading,
      item.gospel,
      item.liturgicalYear,
      item.name,
      item.pinyin,
      item.responsorialPsalm,
      item.secondReading,
    ),
);

export default class MassRepository {
  public findAll(filter: string, liturgicalYear: string): Mass[] {
    let data = store;
    if (liturgicalYear) {
      data = _filter(store, (item) => item.liturgicalYear == liturgicalYear);
    }
    if (filter) {
      data = _filter(data, (item) => item.name == filter);
    }
    return data;
  }

  public findUpcoming(size: number): Mass[] {
    const now = new Date().getTime();
    const oneDay = 864e5;
    let data = _filter(
      store,
      (item) => new Date(item.date).getTime() + oneDay >= now,
    );
    return _take(data, size);
  }
}
