import NodeCache from "node-cache";

class CacheService {
    private cache: NodeCache;

    constructor(ttlSeconds: number = 86400) {
        this.cache = new NodeCache({ stdTTL: ttlSeconds });
        console.log("Cache initialized with TTL:", ttlSeconds);
    }

    public async getOrSet<T>(key: string, fetchFunction: () => Promise<T>): Promise<T> {
        const cachedData = this.cache.get<T>(key);
        if (cachedData) {
            console.log(`Cache hit for key: ${key}`);
            return cachedData;
        }

        console.log(`Cache miss for key: ${key}`);
        const data = await fetchFunction();
        this.cache.set(key, data);
        return data;
    }

    public flush(): void {
        this.cache.flushAll();
        console.log("Cache flushed");
    }
}

export const cacheService = new CacheService();
