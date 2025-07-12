const express = require('express');
const router = express.Router();
const redemptionController = require('../controllers/redemptionController');
const { isAuth, isAdmin } = require('../middleware/auth');

// All routes require authentication
router.use(isAuth);

// Create a new point redemption
router.post('/', redemptionController.createRedemption);

// Get redemption history for the logged-in user
router.get('/', redemptionController.getRedemptionHistory);

// Update redemption status (admin only)
router.put('/:id/status', isAdmin, redemptionController.updateRedemptionStatus);

module.exports = router; 