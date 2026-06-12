const mongoose = require('mongoose');

const fcSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, unique: true },
  currentStock: { type: Number, default: 0, min: 0 },
  dailySales: { type: Number, default: 0 },
  totalConsumed: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('FC', fcSchema);
