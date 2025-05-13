import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key';

export function authMiddleware(handler) {
  return async (req, res) => {
    try {
      // Get token from header
      const authHeader = req.headers.get('authorization');
      
      if (!authHeader?.startsWith('Bearer ')) {
        return new NextResponse(
          JSON.stringify({ error: 'No token provided' }),
          { status: 401 }
        );
      }

      const token = authHeader.split(' ')[1];

      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        return handler(req, res);
      } catch (error) {
        return new NextResponse(
          JSON.stringify({ error: 'Invalid token' }),
          { status: 401 }
        );
      }
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: 'Server error' }),
        { status: 500 }
      );
    }
  };
}

export function generateToken(user) {
  return jwt.sign(
    { 
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
} 