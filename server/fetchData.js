import log4js from 'log4js';
import axiosClient from '../src/axiosClient';
import redisClient from './redisClient';

const logger = log4js.getLogger('fetchData');

export default async (url) => {
  const redisKey = `data:${url}`;
  const cache = await redisClient.getAsync(redisKey);
  if (cache) {
    logger.info(`Hit redis cache: ${redisKey}`);
    return cache;
  }
  try {
    logger.info(`Fetching data: ${axiosClient.defaults.baseURL}${url}`);
    const response = await axiosClient.get(url);
    const data = JSON.stringify(response.data);
    redisClient.set(redisKey, data, 'EX', 3600 * 24);
    return data;
  } catch (error) {
    logger.error(error);
  }
  return '{}';
};
