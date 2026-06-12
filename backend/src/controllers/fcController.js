const FC = require('../models/FC');
const Sale = require('../models/Sale');

exports.getFCInventory = async (req, res) => {
  try {
    const inventory = await FC.find()
      .populate({ path: 'product', match: { isActive: true } })
      .sort({ updatedAt: -1 });

    const filtered = inventory.filter(item => item.product !== null);

    const result = filtered.map(item => ({
      _id: item._id,
      product: item.product,
      currentStock: item.currentStock,
      dailySales: item.dailySales,
      totalConsumed: item.totalConsumed,
      inventoryRemaining: item.currentStock,
      isLowStock: item.currentStock <= item.product.lowStockThreshold,
      updatedAt: item.updatedAt
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.recordSale = async (req, res) => {
  try {
    const { productId, quantity, pricePerUnit, customer, orderId } = req.body;
    if (!productId || !quantity || !pricePerUnit) {
      return res.status(400).json({ message: 'productId, quantity and pricePerUnit required' });
    }

    const fcItem = await FC.findOne({ product: productId }).populate('product');
    if (!fcItem) return res.status(404).json({ message: 'FC inventory item not found' });
    if (fcItem.currentStock < quantity) {
      return res.status(400).json({ message: `Insufficient stock. Available: ${fcItem.currentStock}` });
    }

    fcItem.currentStock -= Number(quantity);
    fcItem.dailySales += Number(quantity);
    fcItem.totalConsumed += Number(quantity);
    fcItem.updatedAt = new Date();
    await fcItem.save();

    const sale = await Sale.create({
      product: productId,
      quantity: Number(quantity),
      pricePerUnit: Number(pricePerUnit),
      totalAmount: Number(quantity) * Number(pricePerUnit),
      customer: customer || 'Walk-in Customer',
      orderId: orderId || `ORD-${Date.now()}`
    });

    res.status(201).json({ sale, fcItem });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resetDailySales = async (req, res) => {
  try {
    await FC.updateMany({}, { dailySales: 0 });
    res.json({ message: 'Daily sales reset for all FC items' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
