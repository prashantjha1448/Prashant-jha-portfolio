import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = '@portfolio_cache_';

export const cacheService = {
  /**
   * Get cached data by key
   */
  get: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`${CACHE_PREFIX}${key}`);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.warn(`[Cache Get Error - ${key}]:`, e.message);
      return null;
    }
  },

  /**
   * Store data in cache by key
   */
  set: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`${CACHE_PREFIX}${key}`, jsonValue);
    } catch (e) {
      console.warn(`[Cache Set Error - ${key}]:`, e.message);
    }
  },

  /**
   * Remove cached item
   */
  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(`${CACHE_PREFIX}${key}`);
    } catch (e) {
      console.warn(`[Cache Remove Error - ${key}]:`, e.message);
    }
  },

  /**
   * Fetch with Stale-While-Revalidate pattern:
   * 1. Returns cached data immediately if available
   * 2. Executes API fetcher
   * 3. Updates cache and invokes callback with fresh data
   */
  fetchWithCache: async (key, apiFetcher, onDataUpdated, fallbackData = null) => {
    // 1. Read from local cache
    const cachedData = await cacheService.get(key);
    if (cachedData && onDataUpdated) {
      onDataUpdated(cachedData, true); // true = from cache
    }

    // 2. Fetch fresh data from network
    try {
      const freshData = await apiFetcher();
      if (freshData) {
        await cacheService.set(key, freshData);
        if (onDataUpdated) {
          onDataUpdated(freshData, false); // false = fresh network API
        }
        return freshData;
      }
    } catch (err) {
      console.warn(`[API Fetch Failed for ${key}]:`, err.message);
    }

    return cachedData || fallbackData;
  },
};
