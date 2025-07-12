const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },         // e.g. "Men", "Women", "Kids"
  type: { type: String },             // e.g. "Shirt", "Jeans"
  size: { type: String },             // e.g. "M", "L", "XL"
  condition: { type: String },        // e.g. "New", "Used"
  tags: [String],                     // searchable/facetable tags
  images: [String],                   // array of image URLs
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isAvailable: { type: Boolean, default: true },    // item still available?
  approved: { type: Boolean, default: true },      // admin approval required
  featured: { type: Boolean, default: false },      // for carousel on homepage
  likes: { type: Number, default: 0 },             // number of likes
  rating: { type: Number, default: 0, min: 0, max: 5 }, // item rating
  points: { type: Number, required: true },         // points required to rent
  createdAt: { type: Date, default: Date.now }
});

// Add indexes for commonly queried fields
itemSchema.index({ title: 'text', description: 'text', tags: 'text' }); // Text search
itemSchema.index({ category: 1 }); // Category filtering
itemSchema.index({ approved: 1 }); // Admin approval queries
itemSchema.index({ featured: 1 }); // Featured items queries
itemSchema.index({ uploader: 1 }); // User's items queries
itemSchema.index({ likes: -1 }); // Sort by likes
itemSchema.index({ rating: -1 }); // Sort by rating
itemSchema.index({ points: 1 }); // Filter by points range

module.exports = mongoose.model('Item', itemSchema); 