import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [50, 'Name cannot be longer than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    index: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be at least 8 characters long'],
    validate: {
      validator: function(password) {
        // At least one uppercase, one lowercase, one number, one special character
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
        return passwordRegex.test(password);
      },
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    },
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false,
    index: true
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
    default: Date.now,
    index: true
  },
  memberSince: {
    type: Date,
    default: Date.now,
    index: true
  },
  achievements: {
    type: [{
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
    validate: [array => array.length <= 100, 'Achievements cannot exceed 100']
  },
  activity: {
    type: [{
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
    validate: [array => array.length <= 1000, 'Activity log cannot exceed 1000 entries']
  },
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
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ isVerified: 1 });
userSchema.index({ lastActive: -1 });
userSchema.index({ memberSince: -1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
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

// Method to handle failed login attempts
userSchema.methods.incrementLoginAttempts = async function() {
  // Lock account if we have 5 failed attempts and the lock period hasn't expired
  if (this.lockUntil && this.lockUntil > Date.now()) {
    throw new Error('Account is temporarily locked. Please try again later.');
  }
  
  this.loginAttempts += 1;
  
  if (this.loginAttempts >= 5) {
    // Lock for 1 hour
    this.lockUntil = new Date(Date.now() + 60 * 60 * 1000);
  }
  
  await this.save();
};

// Reset login attempts
userSchema.methods.resetLoginAttempts = async function() {
  this.loginAttempts = 0;
  this.lockUntil = null;
  await this.save();
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 