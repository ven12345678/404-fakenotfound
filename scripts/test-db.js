import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_database';

async function testConnection() {
  console.log('Testing database connection...');
  console.log('Using connection string:', MONGODB_URI.replace(/:([^:@]{8})[^:@]*@/, ':****@')); // Hide password in output

  try {
    console.log('\nAttempting to connect to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test creating a collection
    const db = mongoose.connection.db;
    await db.createCollection('test');
    console.log('✅ Successfully created test collection!');
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('\nExisting collections:');
    collections.forEach(collection => console.log(`- ${collection.name}`));
    
    // Clean up
    await db.dropCollection('test');
    console.log('\n✅ Successfully cleaned up test collection!');
    
  } catch (error) {
    console.error('\n❌ Database connection error:');
    console.error('Error message:', error.message);
    
    if (error.name === 'MongoServerSelectionError') {
      console.log('\nPossible solutions:');
      console.log('1. Make sure your MongoDB Atlas cluster is running');
      console.log('2. Check if the connection string in .env.local is correct');
      console.log('3. Verify:');
      console.log('   - Your IP address is whitelisted in MongoDB Atlas');
      console.log('   - Username and password are correct');
      console.log('   - The cluster name in the connection string is correct');
    }
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('\nDisconnected from MongoDB');
    }
  }
}

console.log('Starting database connection test...\n');
testConnection().catch(console.error); 