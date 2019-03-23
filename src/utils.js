import _get from 'lodash/get';
import metadata from '../metadata.json';

export const getMetadata = (key) => {
  return _get(metadata, key);
};
