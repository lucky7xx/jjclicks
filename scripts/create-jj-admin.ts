import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as dns from 'dns';

// DNS setup for macOS compatibility
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1', '1.0.0.1']);

// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// User Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin',
  },
}, {
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function createJJAdmin() {
  try {
    console.log('\n🔧 JJ Clicks Admin Setup\n');

    if (!process.env.MONGODB_URI) {
      console.error('❌ Error: MONGODB_URI not found in .env.local');
      process.exit(1);
    }

    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Admin details
    const name = 'JJ Admin';
    const email = 'admin@jjclicks.com';
    const password = 'jjclicks2025';

    // Check if admin already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('ℹ️  Admin user already exists!');
      console.log(`Email: ${email}`);
      console.log('\nYou can login at: http://localhost:3000/admin/login');
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    console.log('✅ JJ Clicks Admin user created successfully!\n');
    console.log('Admin Details:');
    console.log(`Name: ${admin.name}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${password}`);
    console.log(`\nYou can now login at: http://localhost:3000/admin/login`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error creating admin:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

createJJAdmin();
