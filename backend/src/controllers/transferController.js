const Transfer = require('../models/Transfer');
const Warehouse = require('../models/Warehouse');
const FC = require('../models/FC');

exports.getTransfers = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const transfers = await Transfer.find(filter)
      .populate('product')
      .sort({ createdAt: -1 });
    res.json(transfers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.requestTransfer = async (req, res) => {
  try {
    const { productId, quantity, note } = req.body;
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Valid productId and quantity required' });
    }

    const transfer = await Transfer.create({
      product: productId,
      quantity: Number(quantity),
      requestedBy: req.user?.name || 'FC Manager',
      note: note || '',
      status: 'pending'
    });

    const populated = await Transfer.findById(transfer._id).populate('product');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approveTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.findById(req.params.id).populate('product');
    if (!transfer) return res.status(404).json({ message: 'Transfer not found' });
    if (transfer.status !== 'pending') {
      return res.status(400).json({ message: `Transfer already ${transfer.status}` });
    }

    const warehouseItem = await Warehouse.findOne({ product: transfer.product._id });
    if (!warehouseItem) return res.status(404).json({ message: 'Warehouse entry not found' });

    if (warehouseItem.currentStock < transfer.quantity) {
      return res.status(400).json({
        message: `Insufficient warehouse stock. Available: ${warehouseItem.currentStock}, Requested: ${transfer.quantity}`
      });
    }

    // Deduct from warehouse
    warehouseItem.currentStock -= transfer.quantity;
    warehouseItem.totalSentToFC += transfer.quantity;
    warehouseItem.updatedAt = new Date();
    await warehouseItem.save();

    // Add to FC
    const fcItem = await FC.findOne({ product: transfer.product._id });
    if (fcItem) {
      fcItem.currentStock += transfer.quantity;
      fcItem.updatedAt = new Date();
      await fcItem.save();
    }

    // Update transfer status
    transfer.status = 'approved';
    transfer.approvedBy = req.user?.name || 'Warehouse Manager';
    transfer.approvedAt = new Date();
    await transfer.save();

    const populated = await Transfer.findById(transfer._id).populate('product');
    res.json({
      transfer: populated,
      warehouseStock: warehouseItem.currentStock,
      fcStock: fcItem ? fcItem.currentStock : null
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.rejectTransfer = async (req, res) => {
  try {
    const transfer = await Transfer.findById(req.params.id);
    if (!transfer) return res.status(404).json({ message: 'Transfer not found' });
    if (transfer.status !== 'pending') {
      return res.status(400).json({ message: `Transfer already ${transfer.status}` });
    }

    transfer.status = 'rejected';
    transfer.approvedBy = req.user?.name || 'Warehouse Manager';
    transfer.approvedAt = new Date();
    await transfer.save();

    const populated = await Transfer.findById(transfer._id).populate('product');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
