const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, unique: true },
  currentStock: { type: Number, default: 0, min: 0 },
  totalReceived: { type: Number, default: 0 },
  totalSentToFC: { type: Number, default: 0 },
}, { timestamps: true });

warehouseSchema.virtual('remainingStock').get(function () {
  return this.currentStock;
});

module.exports = mongoose.model('Warehouse', warehouseSchema);
