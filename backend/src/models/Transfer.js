const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  requestedBy: { type: String, default: 'FC Manager' },
  approvedBy: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  note: { type: String },
  approvedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Transfer', transferSchema);
