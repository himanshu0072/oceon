const Sale = require('../models/Sale');
const Warehouse = require('../models/Warehouse');
const FC = require('../models/FC');
const Transfer = require('../models/Transfer');
const Product = require('../models/Product');

exports.getDashboard = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Today's sales
    const todaySales = await Sale.find({ saleDate: { $gte: today, $lt: tomorrow } }).populate('product');
    const todayRevenue = todaySales.reduce((sum, s) => sum + s.totalAmount, 0);
    const todayOrders = todaySales.length;
    const todayUnits = todaySales.reduce((sum, s) => sum + s.quantity, 0);

    // Top selling products (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const topSelling = await Sale.aggregate([
      { $match: { saleDate: { $gte: thirtyDaysAgo } } },
      { $group: { _id: '$product', totalQty: { $sum: '$quantity' }, totalRevenue: { $sum: '$totalAmount' } } },
      { $sort: { totalQty: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
      { $unwind: '$product' }
    ]);

    // Warehouse stock
    const warehouseItems = await Warehouse.find().populate({ path: 'product', match: { isActive: true } });
    const warehouseFiltered = warehouseItems.filter(w => w.product !== null);
    const totalWarehouseStock = warehouseFiltered.reduce((sum, w) => sum + w.currentStock, 0);
    const warehouseLowStock = warehouseFiltered.filter(w => w.currentStock <= w.product.lowStockThreshold);

    // FC stock
    const fcItems = await FC.find().populate({ path: 'product', match: { isActive: true } });
    const fcFiltered = fcItems.filter(f => f.product !== null);
    const totalFCStock = fcFiltered.reduce((sum, f) => sum + f.currentStock, 0);
    const fcLowStock = fcFiltered.filter(f => f.currentStock <= f.product.lowStockThreshold);

    // Pending transfers
    const pendingTransfers = await Transfer.find({ status: 'pending' }).populate('product');

    // Total products
    const totalProducts = await Product.countDocuments({ isActive: true });

    res.json({
      today: { revenue: todayRevenue, orders: todayOrders, units: todayUnits, sales: todaySales.slice(0, 10) },
      topSellingProducts: topSelling,
      warehouse: { totalStock: totalWarehouseStock, lowStockItems: warehouseLowStock, items: warehouseFiltered.slice(0, 5) },
      fc: { totalStock: totalFCStock, lowStockItems: fcLowStock, items: fcFiltered.slice(0, 5) },
      pendingTransfers,
      totalProducts
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
