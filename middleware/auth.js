import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export default async function auth(req, res, next) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return res.status(401).json({ error: 'Please authenticate' });
    }

    // Add user to request
    req.user = token.user;
    req.token = token;

    if (typeof next === 'function') {
      return next();
    }
    
    return true;
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'Please authenticate' });
  }
} 