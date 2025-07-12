const mongoose = require('mongoose');

const pointRedemptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  pointsUsed: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Completed'
  },
  createdAt: { type: Date, default: Date.now }
});

// Add indexes for commonly queried fields
pointRedemptionSchema.index({ user: 1 });
pointRedemptionSchema.index({ status: 1 });
pointRedemptionSchema.index({ createdAt: 1 });

module.exports = mongoose.model('PointRedemption', pointRedemptionSchema); 