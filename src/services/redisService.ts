import redis, { RedisClient } from 'redis';
import log4js from 'log4js';

const logger = log4js.getLogger();

const REDIS_PORT = <number>(process.env.REDIS_PORT || 6379);

const client = redis.createClient(REDIS_PORT);

class RedisService {

    async hasKey(key: string): Promise<boolean> {
        const redisHasKey = await new Promise<boolean>((resolve, reject) => {
            client.exists(key, (error, ok) => {
                if (error) return reject(error);
                resolve(ok === 1);
            });
        });
        logger.info(`redisHasKey ${key}? ${redisHasKey}`);
        return redisHasKey;
    }
   
    async get(key: string): Promise<string | null> {
        return await new Promise((resolve, reject) => {
            try {
                client.get(key, (error, data) => {
                    if (error) {
                        logger.error(`Error getting data with key '${key}'`);
                        reject(error);
                    }
                    resolve(JSON.parse(data || ''));
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async set(key: string, data: any, expireTimeInSeconds?: number) {
        logger.info(`Setting key: ${key}`);
        expireTimeInSeconds = Number(expireTimeInSeconds);
        if (!Number.isNaN(expireTimeInSeconds)) {
            client.setex(key, expireTimeInSeconds, data);
        } else {
            client.set(key, JSON.stringify(data));
        }
    }

}

export default new RedisService();