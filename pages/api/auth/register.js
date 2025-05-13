import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer';
import { registerLimiter } from '@/lib/rateLimit';
import xss from 'xss';
import { createTransport } from '@/lib/email';

// Custom error class for validation errors
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

const validateInput = (name, email, password) => {
  if (!name || !email || !password) {
    throw new ValidationError('All fields are required');
  }

  if (name.length > 50) {
    throw new ValidationError('Name cannot be longer than 50 characters');
  }

  // Password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
  if (!passwordRegex.test(password)) {
    throw new ValidationError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
  }

  if (password.length < 8) {
    throw new ValidationError('Password must be at least 8 characters long');
  }
};

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Apply rate limiting
    await new Promise((resolve, reject) => {
      registerLimiter(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        resolve();
      });
    });

    await connectDB();

    const { name, email, password } = req.body;

    // Validate input
    validateInput(name, email, password);

    // Sanitize input
    const sanitizedName = xss(name.trim());
    const sanitizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: sanitizedEmail });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create verification token with expiration
    const verificationToken = randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create new user
    const user = new User({
      name: sanitizedName,
      email: sanitizedEmail,
      password,
      verificationToken,
      verificationTokenExpires,
      memberSince: new Date()
    });

    await user.save();

    // Send verification email with retry logic
    const transporter = createTransport();
    const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify?token=${verificationToken}`;

    const maxRetries = 3;
    let retries = 0;
    let emailSent = false;

    while (retries < maxRetries && !emailSent) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: sanitizedEmail,
          subject: 'Verify your email address',
          html: `
            <h1>Welcome to FakeNotFound!</h1>
            <p>Please click the link below to verify your email address:</p>
            <a href="${verificationUrl}">${verificationUrl}</a>
            <p>This link will expire in 24 hours.</p>
            <p>If you did not create this account, please ignore this email.</p>
          `
        });
        emailSent = true;
      } catch (error) {
        retries++;
        if (retries === maxRetries) {
          console.error('Failed to send verification email:', error);
          // Don't throw error, continue with registration but notify user
        }
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000 * retries));
      }
    }

    // Return success without sensitive data
    const userWithoutSensitive = {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified
    };

    return res.status(201).json({
      message: emailSent 
        ? 'Registration successful. Please check your email to verify your account.'
        : 'Registration successful but there was an issue sending the verification email. Please contact support.',
      user: userWithoutSensitive
    });

  } catch (error) {
    console.error('Registration error:', error);

    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }

    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    return res.status(500).json({ 
      error: 'Registration failed',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export default handler; 