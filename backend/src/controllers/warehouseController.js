const Warehouse = require('../models/Warehouse');
const Product = require('../models/Product');

exports.getWarehouseInventory = async (req, res) => {
  try {
    const inventory = await Warehouse.find()
      .populate({ path: 'product', match: { isActive: true } })
      .sort({ updatedAt: -1 });

    const filtered = inventory.filter(item => item.product !== null);

    const result = filtered.map(item => ({
      _id: item._id,
      product: item.product,
      currentStock: item.currentStock,
      totalReceived: item.totalReceived,
      totalSentToFC: item.totalSentToFC,
      remainingStock: item.currentStock,
      isLowStock: item.currentStock <= item.product.lowStockThreshold,
      updatedAt: item.updatedAt
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.receiveStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Valid productId and quantity required' });
    }

    const warehouseItem = await Warehouse.findOne({ product: productId });
    if (!warehouseItem) return res.status(404).json({ message: 'Warehouse entry not found' });

    warehouseItem.currentStock += Number(quantity);
    warehouseItem.totalReceived += Number(quantity);
    warehouseItem.updatedAt = new Date();
    await warehouseItem.save();

    const populated = await Warehouse.findById(warehouseItem._id).populate('product');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getWarehouseItem = async (req, res) => {
  try {
    const item = await Warehouse.findOne({ product: req.params.productId }).populate('product');
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
