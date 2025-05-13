import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  level: {
    type: Number,
    default: 1
  },
  tokens: {
    type: Number,
    default: 0
  },
  earnings: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  achievements: [{
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: String,
    dateEarned: {
      type: Date,
      default: Date.now
    }
  }],
  activity: [{
    type: {
      type: String,
      required: true
    },
    description: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  stats: {
    totalVerifications: {
      type: Number,
      default: 0
    },
    successRate: {
      type: Number,
      default: 0
    },
    totalEarnings: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update streak method
userSchema.methods.updateStreak = function() {
  const now = new Date();
  const lastActive = this.lastActive;
  const diffDays = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    this.streak += 1;
  } else if (diffDays > 1) {
    this.streak = 0;
  }
  
  this.lastActive = now;
  return this.save();
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 