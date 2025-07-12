const express = require('express');
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const { isAuth, isAdmin } = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
// JWT auth middleware
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authenticateJWT, authController.getProfile);
router.put('/profile', authenticateJWT, authController.updateProfile);
router.get('/users/:id/is-admin', authenticateJWT, authController.checkAdmin);

// Admin route to add points to user
router.post('/admin/add-points', isAuth, isAdmin, authController.addPointsToUser);

module.exports = router; 