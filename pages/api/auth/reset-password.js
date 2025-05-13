import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import User from '../../../models/User';
import { sendPasswordResetEmail } from '../../../lib/email';
import { resetPasswordSchema } from '../../../middleware/validation';
import { rateLimiter } from '../../../middleware/rateLimit';

const rateLimit = rateLimiter({ limit: 5, windowMs: 15 * 60 * 1000 }); // 5 requests per 15 minutes

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return new NextResponse(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405 }
    );
  }

  try {
    await rateLimit(req, res, async () => {
      await connectDB();
      
      const body = await req.json();
      
      try {
        resetPasswordSchema.parse(body);
      } catch (error) {
        return new NextResponse(
          JSON.stringify({ error: 'Validation failed', details: error.errors }),
          { status: 400 }
        );
      }

      const { email } = body;
      const user = await User.findOne({ email });

      if (!user) {
        return new NextResponse(
          JSON.stringify({ message: 'If an account exists, a password reset email will be sent' }),
          { status: 200 }
        );
      }

      const resetToken = user.generatePasswordResetToken();
      await user.save();

      try {
        await sendPasswordResetEmail(email, resetToken);
        
        return new NextResponse(
          JSON.stringify({ message: 'If an account exists, a password reset email will be sent' }),
          { status: 200 }
        );
      } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        
        throw error;
      }
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Server error' }),
      { status: 500 }
    );
  }
} 