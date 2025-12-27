import { Response } from "express";

export const handleError = (res: Response, error: any) => {
    const statusCode = error.statusCode || 500;
    const message = error.body || error.message || "Internal Server Error";
    res.status(statusCode).json({ error: message });
};

export const formatTimestamp = (ts: number) => {
    return new Date(ts * 1000).toLocaleString();
};

export const processData = (data: any): any => {
    if (Array.isArray(data)) {
        return data.map(processData);
    } else if (typeof data === 'object' && data !== null) {
        const newData: any = {};
        for (const key in data) {
            newData[key] = processData(data[key]);
            if (['date', 'joined', 'last_online'].includes(key) && typeof data[key] === 'number') {
                newData[`${key}_formatted`] = formatTimestamp(data[key]);
            }
        }
        return newData;
    }
    return data;
};

// Helper for limited concurrency
export async function mapWithConcurrency<T, R>(
    items: T[],
    concurrency: number,
    fn: (item: T) => Promise<R>
): Promise<R[]> {
    const results = new Array(items.length);
    let index = 0;

    async function worker() {
        while (index < items.length) {
            const i = index++;
            try {
                results[i] = await fn(items[i]);
            } catch (e) {
                console.error(`Error in concurrency worker for item ${i}:`, e);
                results[i] = null as any;
            }
        }
    }

    await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }).map(worker));
    return results;
}
