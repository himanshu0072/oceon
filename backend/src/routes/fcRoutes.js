const express = require('express');
const router = express.Router();
const { getFCInventory, recordSale, resetDailySales } = require('../controllers/fcController');
const { protect, authorize } = require('../middleware/authMiddleware');

// admin, fc_manager, salesperson can view FC
router.get('/', protect, authorize('admin', 'fc_manager', 'salesperson', 'warehouse_manager'), getFCInventory);
// salesperson + fc_manager + admin can record sales
router.post('/sale', protect, authorize('admin', 'fc_manager', 'salesperson'), recordSale);
// only admin can reset daily sales
router.post('/reset-daily', protect, authorize('admin'), resetDailySales);
module.exports = router;
