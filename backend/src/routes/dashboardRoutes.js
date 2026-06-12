const express = require('express');
const router = express.Router();
const { getDashboard } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Only admin sees the full founder dashboard
router.get('/', protect, authorize('admin'), getDashboard);
module.exports = router;
