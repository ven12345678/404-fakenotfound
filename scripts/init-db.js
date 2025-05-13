import mongoose from 'mongoose';
import User from '../models/User.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://chenshaoyee666:ac704uEseOomyTwo@cluster0.50cn5t8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function initializeDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create indexes
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ verificationToken: 1 });
    await User.collection.createIndex({ resetPasswordToken: 1 });
    
    console.log('Database indexes created successfully');

    // Create admin user if it doesn't exist
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@fakenotfound.com',
        password: 'Admin@123',
        role: 'admin',
        isVerified: true
      });
      console.log('Admin user created successfully');
    }

  } catch (error) {
    console.error('Database initialization failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

initializeDB(); 