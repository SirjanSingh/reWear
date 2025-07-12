const PointRedemption = require('../models/PointRedemption');
const Item = require('../models/Item');
const User = require('../models/User');

// Create a new point redemption request
exports.createRedemption = async (req, res) => {
    try {
        const { itemId, pointsToUse } = req.body;
        
        // Verify item exists and is available
        const item = await Item.findById(itemId);
        if (!item || !item.isAvailable) {
            return res.status(404).json({ message: 'Item not found or not available' });
        }

        // Verify user has enough points
        const user = await User.findById(req.user._id);
        if (user.points < pointsToUse) {
            return res.status(400).json({ message: 'Insufficient points' });
        }

        // Create redemption request
        const redemption = new PointRedemption({
            user: req.user._id,
            item: itemId,
            pointsUsed: pointsToUse
        });

        // Deduct points from user
        user.points -= pointsToUse;
        await user.save();

        // Add to user's redemption history
        user.redemptionHistory.push(redemption._id);
        await user.save();

        await redemption.save();

        res.status(201).json(redemption);
    } catch (error) {
        res.status(500).json({ message: 'Error creating redemption request', error: error.message });
    }
};

// Get redemption history for the logged-in user
exports.getRedemptionHistory = async (req, res) => {
    try {
        const redemptions = await PointRedemption.find({ user: req.user._id })
            .populate('item')
            .sort('-createdAt');

        res.json(redemptions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching redemption history', error: error.message });
    }
};

// Update redemption status (admin only)
exports.updateRedemptionStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const redemption = await PointRedemption.findById(req.params.id)
            .populate('item');

        if (!redemption) {
            return res.status(404).json({ message: 'Redemption request not found' });
        }

        // Only allow completion status update
        if (status !== 'Completed') {
            return res.status(400).json({ message: 'Invalid status update' });
        }

        // Mark item as unavailable when redemption is completed
        if (status === 'Completed') {
            await Item.findByIdAndUpdate(redemption.item._id, { isAvailable: false });
        }

        redemption.status = status;
        await redemption.save();

        res.json(redemption);
    } catch (error) {
        res.status(500).json({ message: 'Error updating redemption status', error: error.message });
    }
}; 