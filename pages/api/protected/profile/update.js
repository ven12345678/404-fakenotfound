import connectDB from '../../../../lib/db';
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
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

      // Get request body
      const { username, email } = req.body;

      // Validate input
      if (!username || !email) {
        return res.status(400).json({ error: 'Username and email are required' });
      }

      // Check if email is already taken by another user
      const existingUser = await User.findOne({
        _id: { $ne: decoded.id },
        email: email.toLowerCase()
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Email is already taken' });
      }

      // Check if username is already taken by another user
      const existingUsername = await User.findOne({
        _id: { $ne: decoded.id },
        username: username
      });

      if (existingUsername) {
        return res.status(400).json({ error: 'Username is already taken' });
      }

      // Update user
      const updatedUser = await User.findByIdAndUpdate(
        decoded.id,
        {
          username,
          email: email.toLowerCase()
        },
        { new: true }
      ).select('-password -emailVerificationToken -emailVerificationExpires -passwordResetToken -passwordResetExpires');

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({
        message: 'Profile updated successfully',
        user: {
          id: updatedUser._id,
          name: updatedUser.username,
          email: updatedUser.email
        }
      });
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    console.error('Profile update error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
} 