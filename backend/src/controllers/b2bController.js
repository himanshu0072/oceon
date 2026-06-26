const B2BClient = require("../models/B2BClient");
const Purchase = require("../models/Purchase");

// ================= REGISTER CLIENT =================
const registerClient = async (req, res) => {
  try {
    const exists = await B2BClient.findOne({
      mobile: req.body.mobile,
    });

    if (exists) {
      return res.status(400).json({
        message: "Client already exists",
      });
    }

    const client = await B2BClient.create(req.body);

    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= GET ALL CLIENTS =================
const getClients = async (req, res) => {
  try {
    const search = req.query.search || "";

    const query = {
      $or: [
        {
          businessName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          ownerName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          mobile: {
            $regex: search,
            $options: "i",
          },
        },
        {
          gstNumber: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };

    const clients = await B2BClient.find(search ? query : {}).sort({
      createdAt: -1,
    });

    res.json(clients);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= GET SINGLE CLIENT =================
const getClientById = async (req, res) => {
  try {
    const client = await B2BClient.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    const purchases = await Purchase.find({
      client: req.params.id,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    const totalPurchaseAmount = purchases.reduce(
      (sum, p) => sum + (p.finalAmount || 0),
      0,
    );

    const totalDueAmount = purchases.reduce(
      (sum, p) => sum + (p.dueAmount || 0),
      0,
    );

    res.json({
      client,
      purchases,
      stats: {
        totalOrders: purchases.length,
        totalPurchaseAmount,
        totalDueAmount,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= UPDATE CLIENT =================
const updateClient = async (req, res) => {
  try {
    const client = await B2BClient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    res.json(client);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= DELETE CLIENT =================
const deleteClient = async (req, res) => {
  try {
    const client = await B2BClient.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    await Purchase.deleteMany({
      client: req.params.id,
    });

    await client.deleteOne();

    res.json({
      message: "Client deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= ADD PURCHASE =================
const addPurchase = async (req, res) => {
  try {
    // Generate unique invoice number
    const invoiceNumber =
      "INV-" + Date.now() + "-" + Math.floor(Math.random() * 1000);

    const purchase = await Purchase.create({
      ...req.body,
      invoiceNumber,
    });

    res.status(201).json(purchase);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= GET ALL PURCHASES =================
const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate("client")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(purchases);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= DASHBOARD STATS =================
// ================= DASHBOARD STATS =================
const getDashboardStats = async (req, res) => {
  try {
    const totalClients = await B2BClient.countDocuments();

    const activeClients = await B2BClient.countDocuments({
      status: "Active",
    });

    const purchases = await Purchase.find().populate("client");

    const totalRevenue = purchases.reduce(
      (sum, p) => sum + (p.finalAmount || 0),
      0,
    );

    const outstanding = purchases.reduce(
      (sum, p) => sum + (p.dueAmount || 0),
      0,
    );

    const totalPurchases = purchases.length;

    const averageOrderValue =
      totalPurchases > 0 ? totalRevenue / totalPurchases : 0;

    // Recent Purchases
    const recentPurchases = await Purchase.find()
      .populate("client")
      .sort({ createdAt: -1 })
      .limit(10);

    // Top Clients
    const clientMap = {};

    purchases.forEach((purchase) => {
      const id = purchase.client?._id?.toString();

      if (!id) return;

      if (!clientMap[id]) {
        clientMap[id] = {
          client: purchase.client,
          revenue: 0,
          orders: 0,
          due: 0,
        };
      }

      clientMap[id].revenue += purchase.finalAmount || 0;
      clientMap[id].orders += 1;
      clientMap[id].due += purchase.dueAmount || 0;
    });

    const topClients = Object.values(clientMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    const highestOutstanding = Object.values(clientMap)
      .sort((a, b) => b.due - a.due)
      .slice(0, 5);

    // Monthly Revenue
    const monthlyRevenue = [
      { month: "Jan", revenue: 0 },
      { month: "Feb", revenue: 0 },
      { month: "Mar", revenue: 0 },
      { month: "Apr", revenue: 0 },
      { month: "May", revenue: 0 },
      { month: "Jun", revenue: 0 },
      { month: "Jul", revenue: 0 },
      { month: "Aug", revenue: 0 },
      { month: "Sep", revenue: 0 },
      { month: "Oct", revenue: 0 },
      { month: "Nov", revenue: 0 },
      { month: "Dec", revenue: 0 },
    ];

    purchases.forEach((purchase) => {
      const month = new Date(purchase.createdAt).getMonth();

      monthlyRevenue[month].revenue += purchase.finalAmount || 0;
    });

    res.json({
      totalClients,
      activeClients,
      totalRevenue,
      outstanding,
      totalPurchases,
      averageOrderValue,
      monthlyRevenue,
      topClients,
      highestOutstanding,
      recentPurchases,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= EXPORTS =================
module.exports = {
  registerClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
  addPurchase,
  getPurchases,
  getDashboardStats,
};
