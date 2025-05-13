import nodemailer from 'nodemailer';

let transporter = null;

export const createTransport = () => {
  if (transporter) {
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    pool: true, // Use pooled connections
    maxConnections: 5, // Maximum number of simultaneous connections
    maxMessages: 100, // Maximum number of messages per connection
    rateDelta: 1000, // How many messages per second
    rateLimit: 5, // Maximum number of messages per rateDelta
  });

  // Verify connection configuration
  transporter.verify(function(error, success) {
    if (error) {
      console.error('Email transport verification failed:', error);
    } else {
      console.log('Email transport is ready to send messages');
    }
  });

  return transporter;
}; 