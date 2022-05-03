import { LiturgicalYear, Mass } from './Mass';
import _orderBy from 'lodash/orderBy';
import _filter from 'lodash/filter';
import _sortBy from 'lodash/sortBy';
import _take from 'lodash/take';
import _union from 'lodash/union';
import liturgicalYearA from '../../../public/data/mass/a.json';
import liturgicalYearB from '../../../public/data/mass/b.json';
import liturgicalYearC from '../../../public/data/mass/c.json';

const store = _orderBy(
  _union(liturgicalYearA, liturgicalYearB, liturgicalYearC),
  ['date'],
  ['desc'],
).map(
  (item) =>
    new Mass(
      item.date,
      item.firstReading,
      item.gospel,
      item.liturgicalYear as LiturgicalYear,
      item.name,
      item.pinyin,
      item.responsorialPsalm,
      item.secondReading,
    ),
);

export default class MassRepository {
  public findAll(filter?: string): Mass[] {
    return store.slice();
  }

  public findFeatured(size: number): Mass[] {
    const now = Date.now();
    const oneDay = 864e5;
    return _take(
      _sortBy(
        _filter(store, (item) => {
          const date = new Date(item.date).getTime();
          return date - now >= oneDay;
        }),
        ['date'],
      ),
      size,
    );
  }
}
