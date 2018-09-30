import _ from 'lodash';
import metadata from '../../metadata';

export const getGA = () => {
  return _.get(metadata, 'google.ga');
};

export const getFooterNotes = () => {
  return _.get(metadata, 'footer.notes');
};
