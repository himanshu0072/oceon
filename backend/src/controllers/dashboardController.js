const Sale = require("../models/Sale");
const Warehouse = require("../models/Warehouse");
const Product = require("../models/Product");

exports.getDashboard = async (req, res) => {
  try {
    // =====================================
    // TODAY'S SALES
    // =====================================

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todaySales = await Sale.find({
      saleDate: {
        $gte: today,
        $lt: tomorrow,
      },
    }).populate("product");

    const todayRevenue = todaySales.reduce(
      (sum, sale) => sum + sale.totalAmount,
      0,
    );

    const todayOrders = todaySales.length;

    const todayUnits = todaySales.reduce((sum, sale) => sum + sale.quantity, 0);

    // =====================================
    // TOP SELLING PRODUCTS (LAST 30 DAYS)
    // =====================================

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const topSellingProducts = await Sale.aggregate([
      {
        $match: {
          saleDate: {
            $gte: thirtyDaysAgo,
          },
        },
      },
      {
        $group: {
          _id: "$product",
          totalQty: {
            $sum: "$quantity",
          },
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
      {
        $sort: {
          totalQty: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
    ]);

    // =====================================
    // WAREHOUSE STOCK
    // =====================================

    const warehouseItems = await Warehouse.find().populate({
      path: "product",
      match: {
        isActive: true,
      },
    });

    const activeWarehouseItems = warehouseItems.filter(
      (item) => item.product !== null,
    );

    const totalWarehouseStock = activeWarehouseItems.reduce(
      (sum, item) => sum + item.currentStock,
      0,
    );

    const lowStockItems = activeWarehouseItems.filter(
      (item) => item.currentStock <= (item.product.lowStockThreshold || 10),
    );

    // =====================================
    // OVERALL STATS
    // =====================================

    const totalProducts = await Product.countDocuments({
      isActive: true,
    });

    const allSales = await Sale.find();

    const totalRevenue = allSales.reduce(
      (sum, sale) => sum + sale.totalAmount,
      0,
    );

    const totalOrders = allSales.length;

    // =====================================
    // RECENT SALES
    // =====================================

    const recentSales = await Sale.find()
      .populate("product")
      .sort({ saleDate: -1 })
      .limit(10);

    // =====================================
    // RESPONSE
    // =====================================

    res.json({
      today: {
        revenue: todayRevenue,
        orders: todayOrders,
        units: todayUnits,
        sales: todaySales.slice(0, 10),
      },

      totalRevenue,

      totalOrders,

      totalProducts,

      topSellingProducts,

      warehouse: {
        totalStock: totalWarehouseStock,
        lowStockItems,
        items: activeWarehouseItems.slice(0, 10),
      },

      recentSales,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
