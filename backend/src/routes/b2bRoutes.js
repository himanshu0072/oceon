const express = require("express");
const router = express.Router();

const {
  registerClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
  addPurchase,
  getPurchases,
  getDashboardStats,
} = require("../controllers/b2bController");

const { protect, authorize } = require("../middleware/authMiddleware");

// ================= CLIENT ROUTES =================

router.post(
  "/clients",
  protect,
  authorize("admin", "warehouse_manager", "fc_manager"),
  registerClient,
);

router.get(
  "/clients",
  protect,
  authorize("admin", "warehouse_manager", "fc_manager"),
  getClients,
);

router.get(
  "/clients/:id",
  protect,
  authorize("admin", "warehouse_manager", "fc_manager"),
  getClientById,
);

router.put(
  "/clients/:id",
  protect,
  authorize("admin", "warehouse_manager", "fc_manager"),
  updateClient,
);

router.delete("/clients/:id", protect, authorize("admin"), deleteClient);

// ================= PURCHASE ROUTES =================

router.post(
  "/purchases",
  protect,
  authorize("admin", "warehouse_manager", "fc_manager"),
  addPurchase,
);

router.get(
  "/purchases",
  protect,
  authorize("admin", "warehouse_manager", "fc_manager"),
  getPurchases,
);

// ================= DASHBOARD =================

router.get(
  "/dashboard",
  protect,
  authorize("admin", "warehouse_manager", "fc_manager"),
  getDashboardStats,
);

module.exports = router;
