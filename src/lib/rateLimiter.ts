import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import redis from '../server/redis';

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

export const RATE_LIMITS = {
  login: { windowMs: 15 * 60 * 1000, maxRequests: 5 },
  GENERAL_API: { windowMs: 60 * 1000, maxRequests: 30 }
};

export class TooManyRequestsError extends Error {
  readonly message = "Too many requests";
  readonly statusCode = 429;
  readonly retryAfter: number;

  constructor(retryAfter: number) {
    super();

    this.name = "TooManyRequestsError";
    this.retryAfter = retryAfter;
  }
}

export async function checkRateLimit(identifier: string, key: string): Promise<{ allowed: boolean; remaining: number; retryAfter: number }> {
  const redisKey = `ratelimit:${key}:${identifier}`;

  const config = RATE_LIMITS[key] ? RATE_LIMITS[key] : RATE_LIMITS.GENERAL_API
  const windowSeconds = Math.ceil(config.windowMs / 1000);

  try {
    let [current, ttl] = (await redis.multi().incr(redisKey).expire(redisKey, windowSeconds, "NX").ttl(redisKey).exec()) as unknown as [number, number];

    const allowed = current <= config.maxRequests;
    const remaining = Math.max(0, config.maxRequests - current);
    const retryAfter = allowed ? 0 : Math.max(0, ttl);

    return { allowed, remaining, retryAfter };
  } catch (error) {
    console.error('Rate limiter error:', error);
    // Fail open - allow request if Redis is down
    return { allowed: true, remaining: config.maxRequests, retryAfter: 0 };
  }
}

export function getClientIPFromHeaderList(headerList?: ReadonlyHeaders): string {
  if (!headerList) return 'unknown';

  return (
    headerList.get('x-forwarded-for')?.split(',')[0].trim() ||
    headerList.get('x-real-ip') ||
    headerList.get('cf-connecting-ip') ||
    'unknown'
  );
}

export function getClientIP(request?: Request): string {
  if (!request) return 'unknown';

  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}