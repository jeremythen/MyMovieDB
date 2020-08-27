import redis, { RedisClient } from 'redis';
import log4js from 'log4js';

const logger = log4js.getLogger();

const REDIS_PORT = <number>(process.env.REDIS_PORT || 6379);

class RedisService {

    private redisClient: RedisClient;

    constructor() {
        try {
            this.redisClient = redis.createClient(REDIS_PORT);
        } catch(error) {
            logger.error('Error connection to redis client', error);
            throw error;
        }
    }

    async hasKey(key: string): Promise<boolean> {
        const redisHasKey = await new Promise<boolean>((resolve, reject) => {
            this.redisClient.exists(key, (error, ok) => {
                if (error) return reject(error);
                resolve(ok === 1);
            });
        });
        logger.info(`redisHasKey ${key}? ${redisHasKey}`);
        return redisHasKey;
    }
   
    async get(key: string): Promise<any | null> {
        return await new Promise((resolve, reject) => {
            try {
                this.redisClient.get(key, (error, data) => {
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
            this.redisClient.setex(key, expireTimeInSeconds, data);
        } else {
            this.redisClient.set(key, JSON.stringify(data));
        }
    }

}

export default RedisService;