import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import auth from '@/middleware/auth';

export default async function handler(req, res) {
  await connectDB();

  // Authenticate request
  const authResult = await auth(req, res);
  if (authResult !== true) return authResult;

  switch (req.method) {
    case 'GET':
      try {
        const user = await User.findById(req.user.id).select('-password -verificationToken -verificationTokenExpires');
        
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Update streak
        await user.updateStreak();

        return res.status(200).json({ user });
      } catch (error) {
        console.error('Profile fetch error:', error);
        return res.status(500).json({ error: 'Failed to fetch profile' });
      }

    case 'PUT':
      try {
        const updates = req.body;
        const allowedUpdates = ['name', 'email'];
        const isValidOperation = Object.keys(updates).every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
          return res.status(400).json({ error: 'Invalid updates' });
        }

        const user = await User.findById(req.user.id);
        
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Apply updates
        Object.keys(updates).forEach(update => {
          user[update] = updates[update];
        });

        await user.save();

        // Return updated user without sensitive data
        const updatedUser = await User.findById(user._id).select('-password -verificationToken -verificationTokenExpires');
        
        return res.status(200).json({ 
          message: 'Profile updated successfully',
          user: updatedUser
        });
      } catch (error) {
        console.error('Profile update error:', error);
        return res.status(500).json({ error: 'Failed to update profile' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
} 