import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Verification token is required' });
    }

    // Find user with matching token and token not expired
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired verification token' });
    }

    // Update user verification status
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    // Add first achievement for verifying email
    user.achievements.push({
      type: 'verification',
      name: 'Email Verified',
      description: 'Verified your email address'
    });

    // Add activity
    user.activity.push({
      type: 'verification',
      description: 'Email address verified'
    });

    await user.save();

    return res.status(200).json({
      message: 'Email verified successfully',
      isVerified: true
    });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ error: 'Verification failed' });
  }
} 