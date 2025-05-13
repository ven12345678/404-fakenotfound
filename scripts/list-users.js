import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/404-fakenotfound';

async function listUsers() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!\n');

    const User = mongoose.model('User');
    const users = await User.find({}, {
      password: 0, // Exclude password field
      __v: 0, // Exclude version field
    });

    console.log('Registered Users:');
    console.log('================\n');

    if (users.length === 0) {
      console.log('No users found in the database.');
    } else {
      users.forEach((user, index) => {
        console.log(`User ${index + 1}:`);
        console.log('- Username:', user.username);
        console.log('- Email:', user.email);
        console.log('- Role:', user.role);
        console.log('- Created:', user.createdAt);
        console.log('- ID:', user._id);
        console.log('');
      });

      console.log(`Total users: ${users.length}`);
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from database.');
  }
}

console.log('Listing registered users...\n');
listUsers(); 