const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: function() {
      // Password is required if not using social login
      return !this.socialProvider;
    },
    minlength: 6,
  },
  points: {
    type: Number,
    default: 0,
    min: 0,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  socialProvider: {
    type: String, // e.g., 'google', 'facebook', etc.
    default: null,
  },
  socialProviderId: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    trim: true,
  },
  avatarUrl: {
    type: String,
  },
}, {
  timestamps: true,
});

userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema); 