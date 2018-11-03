import _ from 'lodash';
import camelcaseKeys from 'camelcase-keys';
import mass from '../data/mass.json';
import metadata from '../metadata.json';

const massList = camelcaseKeys(mass, {deep: true});

export const getMetadata = (key) => {
  return _.get(metadata, key);
};

export const getMassList = () => {
  return massList;
};
