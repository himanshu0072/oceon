const express = require('express');
const router = express.Router();
const { getWarehouseInventory, receiveStock, getWarehouseItem } = require('../controllers/warehouseController');
const { protect, authorize } = require('../middleware/authMiddleware');

// admin + warehouse_manager can see & manage warehouse
router.get('/', protect, authorize('admin', 'warehouse_manager'), getWarehouseInventory);
router.post('/receive', protect, authorize('admin', 'warehouse_manager'), receiveStock);
router.get('/:productId', protect, authorize('admin', 'warehouse_manager'), getWarehouseItem);
module.exports = router;
