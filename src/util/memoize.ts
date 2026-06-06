const cache_miss = Symbol("cache_miss");

type Cache<T> = {
    expire_at: number | null;
    is_promise?: boolean;
    result: T;
};

export const memoize = <F extends (...args: never[]) => unknown>(
    fn: F,
    name = fn.name,
    timeout = 3600 * 60 * 100,
): F => {
    type Cached = Awaited<ReturnType<F>>;
    const pending = new Map<string, ReturnType<F>>();

    const read = (
        key: string,
        now: number,
    ): Cached | Promise<Cached> | typeof cache_miss => {
        const value = localStorage.getItem(key);
        if (value === null) return cache_miss;

        const parsed = JSON.parse(value) as unknown;
        if (parsed === null || typeof parsed !== "object") {
            localStorage.removeItem(key);
            return cache_miss;
        }

        const cache = parsed as Partial<Cache<Cached>>;
        if (cache.expire_at !== null && typeof cache.expire_at !== "number") {
            localStorage.removeItem(key);
            return cache_miss;
        }

        if (cache.expire_at !== null && cache.expire_at <= now) {
            localStorage.removeItem(key);
            return cache_miss;
        }

        const result = cache.result as Cached;
        return cache.is_promise === true ? Promise.resolve(result) : result;
    };

    const write = (key: string, result: Cached, is_promise = false) => {
        localStorage.setItem(
            key,
            JSON.stringify({
                expire_at: Number.isFinite(timeout)
                    ? Date.now() + timeout
                    : null,
                is_promise,
                result,
            } satisfies Cache<Cached>),
        );
    };

    return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
        const now = Date.now();
        const key = `${name}::${JSON.stringify(args)}`;

        const cached = read(key, now);
        if (cached !== cache_miss) return cached;

        if (pending.has(key)) return pending.get(key)!;

        const result = fn.apply(this, args) as ReturnType<F>;
        if (result instanceof Promise) {
            const promise = result
                .then((value) => {
                    write(key, value as Cached, true);
                    return value;
                })
                .finally(() => {
                    pending.delete(key);
                }) as ReturnType<F>;
            pending.set(key, promise);
            return promise;
        }
        write(key, result as Cached);

        return result;
    } as F;
};
