import _ from 'lodash';
import metadata from '../metadata';

export const getMetadata = (key) => {
  return _.get(metadata, key);
};

export const __DEV__ = process.env.NODE_ENV === 'development';
