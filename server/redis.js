import bluebird from 'bluebird';
import log4js from 'log4js';
import redis from 'redis';

bluebird.promisifyAll(redis);

const namespace = process.env.REDIS_NAMESPACE || '';
export const redisClient = redis.createClient(process.env.REDIS_URL);
const logger = log4js.getLogger('redis');

redisClient.on('error', (err) => {
  logger.error(err);
});

export const buildRedisKey = (...args) => {
  if (namespace) {
    return [namespace, ...args].join(':');
  }
  return args.join(':');
};
