import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'POST':
      // Request password reset
      try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
          // Return success even if user not found for security
          return res.status(200).json({
            message: 'If an account exists with this email, you will receive a password reset link'
          });
        }

        // Generate reset token
        const resetToken = randomBytes(32).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpires;
        await user.save();

        // Send reset email
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: process.env.EMAIL_SECURE === 'true',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;

        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: 'Reset your password',
          html: `
            <h1>Password Reset Request</h1>
            <p>Click the link below to reset your password:</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
          `
        });

        return res.status(200).json({
          message: 'If an account exists with this email, you will receive a password reset link'
        });
      } catch (error) {
        console.error('Password reset request error:', error);
        return res.status(500).json({ error: 'Failed to process password reset request' });
      }

    case 'PUT':
      // Reset password with token
      try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
          return res.status(400).json({ error: 'Token and new password are required' });
        }

        const user = await User.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
          return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        // Update password
        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        // Add activity
        user.activity.push({
          type: 'security',
          description: 'Password reset completed'
        });

        await user.save();

        return res.status(200).json({
          message: 'Password reset successful'
        });
      } catch (error) {
        console.error('Password reset error:', error);
        return res.status(500).json({ error: 'Failed to reset password' });
      }

    default:
      res.setHeader('Allow', ['POST', 'PUT']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
} 