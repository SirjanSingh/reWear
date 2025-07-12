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
  createdAt: { type: Date, default: Date.now }
});

// Add indexes for commonly queried fields
itemSchema.index({ title: 'text', description: 'text', tags: 'text' }); // Text search
itemSchema.index({ category: 1 }); // Category filtering
itemSchema.index({ approved: 1 }); // Admin approval queries
itemSchema.index({ featured: 1 }); // Featured items queries
itemSchema.index({ uploader: 1 }); // User's items queries

module.exports = mongoose.model('Item', itemSchema); 