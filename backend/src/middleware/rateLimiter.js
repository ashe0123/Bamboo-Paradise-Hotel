// Simple in-memory rate limiter (no extra deps needed)
const attempts = new Map();

const rateLimiter = (maxAttempts = 10, windowMs = 15 * 60 * 1000) => {
  return (req, res, next) => {
    const key = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const record = attempts.get(key) || { count: 0, resetAt: now + windowMs };

    if (now > record.resetAt) {
      record.count = 0;
      record.resetAt = now + windowMs;
    }

    record.count++;
    attempts.set(key, record);

    if (record.count > maxAttempts) {
      return res.status(429).json({ message: 'Too many requests. Please try again later.' });
    }
    next();
  };
};

module.exports = rateLimiter;
