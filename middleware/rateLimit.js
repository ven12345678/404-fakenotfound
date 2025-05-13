const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: {
    auth: 5, // 5 requests per 15 minutes for auth endpoints
    api: 100 // 100 requests per 15 minutes for other endpoints
  },
  store: new Map()
};

export default function rateLimiter(type = 'api') {
  return function(req, res, next) {
    const key = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = Date.now();
    const windowStart = now - rateLimit.windowMs;

    // Initialize or clean up old requests
    if (!rateLimit.store.has(key)) {
      rateLimit.store.set(key, []);
    }

    const requests = rateLimit.store.get(key);
    const recentRequests = requests.filter(time => time > windowStart);
    rateLimit.store.set(key, recentRequests);

    if (recentRequests.length >= rateLimit.maxRequests[type]) {
      return res.status(429).json({
        error: 'Too many requests, please try again later',
        retryAfter: Math.ceil((windowStart + rateLimit.windowMs - now) / 1000)
      });
    }

    recentRequests.push(now);
    rateLimit.store.set(key, recentRequests);

    if (typeof next === 'function') {
      return next();
    }
    return true;
  };
} 