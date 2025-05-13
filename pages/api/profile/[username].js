import connectDB from '../../../lib/db';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username } = req.query;

  try {
    await connectDB();

    const user = await User.findOne({ username })
      .select('-password -emailVerificationToken -emailVerificationExpires -passwordResetToken -passwordResetExpires -email');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Format the user data for public viewing
    const publicProfile = {
      name: user.username,
      level: user.level,
      rank: user.rank,
      joinDate: user.createdAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      verificationStreak: user.verificationStreak,
      accuracy: user.accuracy,
      newsVerified: user.totalVerifications,
      isVerified: user.isEmailVerified,
      achievements: user.achievements
        .filter(a => a.completed)
        .map(a => ({
          id: a._id,
          title: a.title,
          description: a.description,
          completed: a.completed
        })),
      stats: {
        verificationsByCategory: user.verificationsByCategory,
        accuracyTrend: user.accuracyTrend.map(t => t.accuracy)
      }
    };

    return res.status(200).json({
      message: 'Profile fetched successfully',
      user: publicProfile
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
} 