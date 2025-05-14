import connectDB from '../../../lib/db';
import User from '../../../models/User';
import { verifyToken } from '../../../lib/auth';

const VERIFICATION_REWARD = 15; // Token reward for each verification

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify authentication token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    await connectDB();

    const { newsId, isCorrect, category } = req.body;
    if (typeof newsId !== 'number') {
      return res.status(400).json({ error: 'Invalid news ID' });
    }

    // Find user and update verified news
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if news is already verified
    const existingVerification = user.verifiedNews.find(v => v.newsId === newsId);
    if (existingVerification) {
      return res.status(200).json({ 
        message: 'News already verified',
        verifiedNews: user.verifiedNews,
        tokens: user.tokens
      });
    }

    // Add new verification
    user.verifiedNews.push({
      newsId,
      verifiedAt: new Date(),
      isCorrect,
      category
    });

    // Update verification stats and tokens
    user.totalVerifications += 1;
    user.tokens += VERIFICATION_REWARD;
    user.totalEarned += VERIFICATION_REWARD;

    if (category && user.verificationsByCategory[category] !== undefined) {
      user.verificationsByCategory[category] += 1;
    }

    // Update streak
    const now = new Date();
    if (!user.lastVerificationDate || 
        (now - user.lastVerificationDate) <= 24 * 60 * 60 * 1000) {
      user.verificationStreak += 1;
    } else {
      user.verificationStreak = 1;
    }
    user.lastVerificationDate = now;

    await user.save();

    return res.status(200).json({
      message: 'Verification saved successfully',
      verifiedNews: user.verifiedNews,
      tokens: user.tokens,
      tokensEarned: VERIFICATION_REWARD
    });
  } catch (error) {
    console.error('Verification update error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
} 