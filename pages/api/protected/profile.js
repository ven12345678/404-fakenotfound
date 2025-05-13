import connectDB from '../../../lib/db';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Connect to database
      await connectDB();

      // Find user
      const user = await User.findById(decoded.id).select('-password -emailVerificationToken -emailVerificationExpires -passwordResetToken -passwordResetExpires');
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Format the user data for the profile dashboard
      const userData = {
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
        level: user.level,
        tokens: user.tokens,
        balance: user.balance,
        rank: user.rank,
        joinDate: user.createdAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        verificationStreak: user.verificationStreak,
        accuracy: user.accuracy,
        newsVerified: user.totalVerifications,
        recentActivity: user.recentVerifications.map(v => ({
          id: v._id,
          type: 'verify',
          title: v.title,
          status: v.status,
          reward: v.reward,
          time: formatTimeAgo(v.createdAt)
        })),
        achievements: user.achievements.map(a => ({
          id: a._id,
          title: a.title,
          description: a.description,
          completed: a.completed,
          progress: a.progress
        })),
        stats: {
          totalEarned: user.totalEarned,
          accuracyTrend: user.accuracyTrend.map(t => t.accuracy),
          verificationsByCategory: user.verificationsByCategory
        }
      };

      return res.status(200).json({
        message: 'Profile accessed successfully',
        user: userData
      });
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    console.error('Profile access error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}

function formatTimeAgo(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return 'just now';
  }
} 