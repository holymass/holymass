import axios from 'axios';
import getMetadata from './getMetadata';

export default axios.create({
  baseURL: getMetadata('dataBaseURL'),
  responseType: 'json',
});
