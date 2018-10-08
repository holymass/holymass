import _ from 'lodash';
import metadata from '../metadata';

export const getMetadata = (key) => {
  return _.get(metadata, key);
};
