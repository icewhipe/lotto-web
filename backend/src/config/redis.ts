import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log('✅ Redis connected');
});

// Connect to Redis (optional)
let isRedisConnected = false;

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    isRedisConnected = true;
    console.log('✅ Redis connected successfully');
  } catch (error) {
    console.warn('⚠️  Redis unavailable - running without cache');
    console.warn('   To enable Redis: brew services start redis');
    isRedisConnected = false;
  }
};

export const isRedisAvailable = () => isRedisConnected;

// Cache helpers
export const cacheService = {
  /**
   * Get value from cache
   */
  get: async (key: string): Promise<string | null> => {
    try {
      return await redisClient.get(key);
    } catch (error) {
      console.error('Redis GET error:', error);
      return null;
    }
  },

  /**
   * Set value in cache
   */
  set: async (key: string, value: string, expiresIn: number = 3600): Promise<boolean> => {
    try {
      await redisClient.setEx(key, expiresIn, value);
      return true;
    } catch (error) {
      console.error('Redis SET error:', error);
      return false;
    }
  },

  /**
   * Delete key from cache
   */
  del: async (key: string): Promise<boolean> => {
    try {
      await redisClient.del(key);
      return true;
    } catch (error) {
      console.error('Redis DEL error:', error);
      return false;
    }
  },

  /**
   * Check if key exists
   */
  exists: async (key: string): Promise<boolean> => {
    try {
      const result = await redisClient.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Redis EXISTS error:', error);
      return false;
    }
  },

  /**
   * Set with expiration
   */
  setWithTTL: async (key: string, value: string, ttl: number): Promise<boolean> => {
    try {
      await redisClient.setEx(key, ttl, value);
      return true;
    } catch (error) {
      console.error('Redis SET with TTL error:', error);
      return false;
    }
  },

  /**
   * Get all keys matching pattern
   */
  keys: async (pattern: string): Promise<string[]> => {
    try {
      return await redisClient.keys(pattern);
    } catch (error) {
      console.error('Redis KEYS error:', error);
      return [];
    }
  },

  /**
   * Clear all keys matching pattern
   */
  clearPattern: async (pattern: string): Promise<number> => {
    try {
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        return await redisClient.del(keys);
      }
      return 0;
    } catch (error) {
      console.error('Redis CLEAR PATTERN error:', error);
      return 0;
    }
  },
};

// Cache middleware
export const cacheMiddleware = (duration: number = 300) => {
  return async (req: any, res: any, next: any) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl}`;

    try {
      const cachedData = await cacheService.get(key);

      if (cachedData) {
        console.log(`✅ Cache HIT: ${key}`);
        return res.json(JSON.parse(cachedData));
      }

      console.log(`❌ Cache MISS: ${key}`);

      // Store original send
      const originalSend = res.json;

      // Override send
      res.json = function (data: any) {
        // Cache the response
        cacheService.set(key, JSON.stringify(data), duration);

        // Call original send
        return originalSend.call(this, data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

export default redisClient;
