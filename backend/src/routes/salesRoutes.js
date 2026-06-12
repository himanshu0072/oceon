const express = require('express');
const router = express.Router();
const { getSales, getTodaySales } = require('../controllers/salesController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('admin', 'fc_manager', 'salesperson'), getSales);
router.get('/today', protect, authorize('admin', 'fc_manager', 'salesperson'), getTodaySales);
module.exports = router;
