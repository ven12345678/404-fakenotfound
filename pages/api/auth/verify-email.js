import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import User from '../../../models/User';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return new NextResponse(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405 }
    );
  }

  try {
    await connectDB();
    
    const { token } = req.query;
    
    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: 'Token is required' }),
        { status: 400 }
      );
    }

    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 400 }
      );
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    return new NextResponse(
      JSON.stringify({ message: 'Email verified successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Email verification error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Server error' }),
      { status: 500 }
    );
  }
} 