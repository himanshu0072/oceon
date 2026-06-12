const Sale = require('../models/Sale');

exports.getSales = async (req, res) => {
  try {
    const { startDate, endDate, limit = 50 } = req.query;
    let filter = {};
    if (startDate || endDate) {
      filter.saleDate = {};
      if (startDate) filter.saleDate.$gte = new Date(startDate);
      if (endDate) filter.saleDate.$lte = new Date(new Date(endDate).setHours(23, 59, 59));
    }
    const sales = await Sale.find(filter)
      .populate('product')
      .sort({ saleDate: -1 })
      .limit(Number(limit));
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTodaySales = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const sales = await Sale.find({ saleDate: { $gte: today, $lt: tomorrow } }).populate('product');
    const totalRevenue = sales.reduce((sum, s) => sum + s.totalAmount, 0);
    const totalOrders = sales.length;
    const totalUnits = sales.reduce((sum, s) => sum + s.quantity, 0);

    res.json({ sales, totalRevenue, totalOrders, totalUnits });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
