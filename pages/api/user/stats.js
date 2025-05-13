import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import auth from '@/middleware/auth';

export default async function handler(req, res) {
  await connectDB();

  // Authenticate request
  const authResult = await auth(req, res);
  if (authResult !== true) return authResult;

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const user = await User.findById(req.user.id).select('stats achievements activity level tokens earnings streak');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate level progress
    const verificationThreshold = 25; // Verifications needed for next level
    const currentLevelVerifications = user.stats.totalVerifications % verificationThreshold;
    const levelProgress = (currentLevelVerifications / verificationThreshold) * 100;

    // Get recent activity
    const recentActivity = user.activity.sort((a, b) => b.date - a.date).slice(0, 10);

    // Calculate achievement progress
    const achievementStats = {
      total: user.achievements.length,
      recent: user.achievements.sort((a, b) => b.dateEarned - a.dateEarned).slice(0, 5),
      progress: {
        beginner: user.stats.totalVerifications >= 10,
        intermediate: user.stats.totalVerifications >= 50,
        expert: user.stats.totalVerifications >= 100,
        master: user.stats.totalVerifications >= 500
      }
    };

    return res.status(200).json({
      stats: {
        level: user.level,
        levelProgress,
        tokens: user.tokens,
        earnings: user.earnings,
        streak: user.streak,
        verifications: user.stats.totalVerifications,
        successRate: user.stats.successRate,
        totalEarnings: user.stats.totalEarnings
      },
      achievements: achievementStats,
      recentActivity
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
} 