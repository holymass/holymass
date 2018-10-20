import _ from 'lodash';
import Loadable from 'react-loadable';
import Loading from 'components/loading';
import metadata from '../metadata';

export const getMetadata = (key) => {
  return _.get(metadata, key);
};

// eslint-disable-next-line new-cap
export const loadable = (opts) => Loadable(_.assign({
  loading: Loading,
  timeout: 10000,
}, opts));
