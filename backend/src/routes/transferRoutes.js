const express = require('express');
const router = express.Router();
const { getTransfers, requestTransfer, approveTransfer, rejectTransfer } = require('../controllers/transferController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All roles can view transfers (for transparency)
router.get('/', protect, authorize('admin', 'warehouse_manager', 'fc_manager', 'salesperson'), getTransfers);
// FC manager and admin can request transfers
router.post('/', protect, authorize('admin', 'fc_manager'), requestTransfer);
// Only warehouse manager and admin can approve/reject
router.put('/:id/approve', protect, authorize('admin', 'warehouse_manager'), approveTransfer);
router.put('/:id/reject', protect, authorize('admin', 'warehouse_manager'), rejectTransfer);
module.exports = router;
