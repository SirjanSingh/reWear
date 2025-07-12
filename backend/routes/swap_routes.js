const express = require('express');
const router = express.Router();
const swapController = require('../controllers/swapController');
const { isAuth } = require('../middleware/auth');

// All routes require authentication
router.use(isAuth);

// Create a new swap request
router.post('/request', swapController.createSwapRequest);

// Get all swap requests for the logged-in user
router.get('/', swapController.getUserSwaps);

// Update swap request status (accept/decline/complete)
router.put('/:id/status', swapController.updateSwapStatus);

module.exports = router; 