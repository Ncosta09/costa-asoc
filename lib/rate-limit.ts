type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

/**
 * Rate limiter en memoria por identificador (IP).
 * Reseteo por ventana fija. Suficiente para un form de contacto en una sola instancia.
 * Para multi-instancia o producción a escala, migrar a Upstash Redis.
 */
export function rateLimit(
  key: string,
  { max = 3, windowMs = 5 * 60_000 }: { max?: number; windowMs?: number } = {},
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    const bucket: Bucket = { count: 1, resetAt: now + windowMs };
    buckets.set(key, bucket);
    return { allowed: true, remaining: max - 1, resetAt: bucket.resetAt };
  }

  if (existing.count >= max) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { allowed: true, remaining: max - existing.count, resetAt: existing.resetAt };
}

// Limpieza pasiva — corre cada ~30 min para evitar leaks en runs largos
let cleanupTimer: NodeJS.Timeout | null = null;
if (typeof process !== "undefined" && process.env.NODE_ENV !== "test" && !cleanupTimer) {
  cleanupTimer = setInterval(
    () => {
      const now = Date.now();
      for (const [key, bucket] of buckets) {
        if (bucket.resetAt < now) buckets.delete(key);
      }
    },
    30 * 60_000,
  );
  cleanupTimer.unref?.();
}
