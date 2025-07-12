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
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  points: { 
    type: Number, 
    default: 0 
  },
  swapHistory: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'SwapRequest' 
  }],
  redemptionHistory: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'PointRedemption' 
  }]
}, { timestamps: true });

// Static method to check if user is admin
userSchema.statics.isUserAdmin = async function(userId) {
  const user = await this.findById(userId);
  return user ? user.isAdmin : false;
};

module.exports = mongoose.model('User', userSchema); 