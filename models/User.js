import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0
  },
  completedAt: Date
});

const verificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Fake', 'True', 'Misleading'],
    required: true
  },
  reward: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  // Profile fields
  level: {
    type: Number,
    default: 1
  },
  tokens: {
    type: Number,
    default: 0
  },
  balance: {
    type: Number,
    default: 0
  },
  rank: {
    type: String,
    enum: ['Novice', 'Truth Seeker', 'Fact Checker', 'Expert Verifier', 'Master Analyst'],
    default: 'Novice'
  },
  verificationStreak: {
    type: Number,
    default: 0
  },
  lastVerificationDate: Date,
  totalVerifications: {
    type: Number,
    default: 0
  },
  accuracy: {
    type: Number,
    default: 100
  },
  verificationsByCategory: {
    politics: { type: Number, default: 0 },
    science: { type: Number, default: 0 },
    technology: { type: Number, default: 0 },
    health: { type: Number, default: 0 }
  },
  accuracyTrend: [{
    accuracy: Number,
    date: { type: Date, default: Date.now }
  }],
  achievements: [achievementSchema],
  recentVerifications: [verificationSchema],
  verifiedNews: [{
    newsId: Number,
    verifiedAt: { type: Date, default: Date.now },
    isCorrect: Boolean,
    category: String
  }],
  totalEarned: {
    type: Number,
    default: 0
  },
  // Auth fields
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate email verification token
userSchema.methods.generateVerificationToken = function() {
  const token = crypto.randomBytes(32).toString('hex');
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  return token;
};

// Generate password reset token
userSchema.methods.generatePasswordResetToken = function() {
  const token = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  return token;
};

// Method to update verification streak
userSchema.methods.updateVerificationStreak = function() {
  const now = new Date();
  const lastVerification = this.lastVerificationDate || now;
  const daysSinceLastVerification = Math.floor((now - lastVerification) / (1000 * 60 * 60 * 24));

  if (daysSinceLastVerification <= 1) {
    this.verificationStreak += 1;
  } else {
    this.verificationStreak = 1;
  }
  this.lastVerificationDate = now;
};

// Method to update accuracy trend
userSchema.methods.updateAccuracyTrend = function(newAccuracy) {
  this.accuracyTrend.push({
    accuracy: newAccuracy,
    date: new Date()
  });

  // Keep only last 7 days
  if (this.accuracyTrend.length > 7) {
    this.accuracyTrend.shift();
  }

  // Update overall accuracy
  const sum = this.accuracyTrend.reduce((acc, curr) => acc + curr.accuracy, 0);
  this.accuracy = Math.round(sum / this.accuracyTrend.length);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 