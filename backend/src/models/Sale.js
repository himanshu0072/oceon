const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  pricePerUnit: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  saleDate: { type: Date, default: Date.now },
  orderId: { type: String },
  customer: { type: String, default: 'Walk-in Customer' },
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);
