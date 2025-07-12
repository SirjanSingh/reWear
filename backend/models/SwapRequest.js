const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },     // Who sent the request
  requestedItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }, // What they want
  offeredItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },   // What they give
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Declined', 'Completed'],
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now }
});

// Add indexes for commonly queried fields
swapRequestSchema.index({ requester: 1 });
swapRequestSchema.index({ status: 1 });
swapRequestSchema.index({ createdAt: 1 });

module.exports = mongoose.model('SwapRequest', swapRequestSchema); 