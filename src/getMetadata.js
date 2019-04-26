import _get from 'lodash/get';
import metadata from '../metadata.json';

export default (key) => {
  return _get(metadata, key);
};
