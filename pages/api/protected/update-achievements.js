import connectDB from '../../../lib/db';
import User from '../../../models/User';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify authentication token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      console.error('No token provided');
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = await verifyToken(token);
    if (!decoded) {
      console.error('Invalid token');
      return res.status(401).json({ error: 'Invalid token' });
    }

    console.log('Token decoded successfully:', { userId: decoded.id });

    await connectDB();
    console.log('Connected to database');

    // Get user and achievements from request
    const { achievements } = req.body;
    if (!achievements || !Array.isArray(achievements)) {
      console.error('Invalid achievements data:', achievements);
      return res.status(400).json({ error: 'Invalid achievements data' });
    }

    console.log('Received achievements:', achievements);

    // Update user's achievements
    const user = await User.findById(decoded.id);
    if (!user) {
      console.error('User not found:', decoded.id);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Found user:', user._id);

    // Update each achievement while preserving other fields
    user.achievements = user.achievements.map((existingAchievement) => {
      const updatedAchievement = achievements.find(
        (a) => a.title === existingAchievement.title
      );
      if (updatedAchievement) {
        console.log('Updating achievement:', {
          title: existingAchievement.title,
          oldProgress: existingAchievement.progress,
          newProgress: updatedAchievement.progress
        });
        return {
          ...existingAchievement.toObject(),
          completed: updatedAchievement.completed,
          progress: updatedAchievement.progress,
          ...(updatedAchievement.streak !== undefined && { streak: updatedAchievement.streak }),
          ...(updatedAchievement.completedAt && { completedAt: new Date(updatedAchievement.completedAt) })
        };
      }
      return existingAchievement;
    });

    await user.save();
    console.log('User achievements updated successfully');

    return res.status(200).json({
      message: 'Achievements updated successfully',
      achievements: user.achievements
    });
  } catch (error) {
    console.error('Achievement update error:', error);
    return res.status(500).json({ 
      error: 'Server error',
      details: error.message 
    });
  }
} 