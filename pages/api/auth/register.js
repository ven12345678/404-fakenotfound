import connectDB from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Connect to database
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected to database');
    
    // Get request body
    const { username, email, password } = req.body;
    console.log('Received registration request:', { username, email, password: '[REDACTED]' });

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username }
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        error: existingUser.email === email.toLowerCase()
          ? 'Email is already registered'
          : 'Username is already taken'
      });
    }

    // Create new user
    const user = new User({
      username,
      email: email.toLowerCase(),
      password,
      // Initialize achievement data
      achievements: [
        {
          title: 'First Verification',
          description: 'Complete your first news verification',
          completed: false,
          progress: 0
        },
        {
          title: '10 Streak',
          description: 'Verify news for 10 days in a row',
          completed: false,
          progress: 0
        },
        {
          title: 'Accuracy Expert',
          description: 'Maintain 90% accuracy for a month',
          completed: false,
          progress: 0
        },
        {
          title: 'Community Leader',
          description: 'Help 50 users with verifications',
          completed: false,
          progress: 0
        }
      ]
    });

    await user.save();

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
} 