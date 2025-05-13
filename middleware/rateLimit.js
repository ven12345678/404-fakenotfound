import { NextResponse } from 'next/server';

const rateLimit = new Map();

export function rateLimiter({ limit = 10, windowMs = 60 * 1000 } = {}) {
  return async function(req, res, next) {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowStart = now - windowMs;
    
    const requestData = rateLimit.get(ip) || { count: 0, windowStart: now };
    
    if (requestData.windowStart < windowStart) {
      requestData.count = 0;
      requestData.windowStart = now;
    }
    
    requestData.count++;
    rateLimit.set(ip, requestData);
    
    if (requestData.count > limit) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many requests',
          retryAfter: Math.ceil((requestData.windowStart + windowMs - now) / 1000)
        }),
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((requestData.windowStart + windowMs - now) / 1000)
          }
        }
      );
    }
    
    return next();
  };
} 