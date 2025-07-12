const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign(
    { _id: user._id, email: user.email, isAdmin: user.isAdmin },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

exports.register = async (req, res) => {
  try {
    const { email, password, name, avatarUrl } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password, and name are required.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      name,
      avatarUrl,
    });
    await user.save();
    const token = generateToken(user);
    res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name, avatarUrl: user.avatarUrl, points: user.points, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const token = generateToken(user);
    res.status(200).json({ token, user: { id: user._id, email: user.email, name: user.name, avatarUrl: user.avatarUrl, points: user.points, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) delete updates.password; // Prevent password update here
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
};

exports.checkAdmin = async (req, res) => {
  try {
    const isAdmin = await User.isUserAdmin(req.params.id);
    res.json({ isAdmin });
  } catch (err) {
    res.status(500).json({ message: 'Failed to check admin status', error: err.message });
  }
};

// Add points to user (admin only)
exports.addPointsToUser = async (req, res) => {
    try {
        const { userId, points } = req.body;

        if (!userId || !points || points <= 0) {
            return res.status(400).json({ message: 'User ID and positive points value are required.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Add points to user's balance
        user.points += points;
        await user.save();

        res.status(200).json({
            message: 'Points added successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                points: user.points
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}; 