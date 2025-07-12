const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { isAuth, isAdmin } = require('../middleware/auth'); // Import from middleware directory

// Public routes
router.get('/', itemController.getItems);
router.get('/:id', itemController.getItemById);

// User routes (require authentication)
router.post('/', isAuth, itemController.createItem);
router.put('/:id', isAuth, itemController.updateItem);
router.delete('/:id', isAuth, itemController.deleteItem);

// Admin routes
router.get('/admin/pending', isAuth, isAdmin, itemController.getPendingItems);
router.put('/admin/:id/approve', isAuth, isAdmin, itemController.approveItem);
router.put('/admin/:id/feature', isAuth, isAdmin, itemController.toggleFeatured);

module.exports = router; 