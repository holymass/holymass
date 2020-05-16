import bluebird from 'bluebird';
import log4js from 'log4js';
import redis from 'redis';

bluebird.promisifyAll(redis);

const client = redis.createClient(process.env.REDIS_URL);
const logger = log4js.getLogger('redis');

client.on('error', (err) => {
  logger.error(err);
});

export default {
  client,
};
