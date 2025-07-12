const SwapRequest = require('../models/SwapRequest');
const Item = require('../models/Item');
const User = require('../models/User');

// Create a new swap request
exports.createSwapRequest = async (req, res) => {
    try {
        const { requestedItemId, offeredItemId } = req.body;
        
        // Verify both items exist and are available
        const [requestedItem, offeredItem] = await Promise.all([
            Item.findById(requestedItemId),
            Item.findById(offeredItemId)
        ]);

        if (!requestedItem || !offeredItem) {
            return res.status(404).json({ message: 'One or both items not found' });
        }

        if (!requestedItem.isAvailable || !offeredItem.isAvailable) {
            return res.status(400).json({ message: 'One or both items are not available for swap' });
        }

        // Verify the user owns the offered item
        if (offeredItem.uploader.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only offer items you own' });
        }

        // Create the swap request
        const swapRequest = new SwapRequest({
            requester: req.user._id,
            requestedItem: requestedItemId,
            offeredItem: offeredItemId
        });

        await swapRequest.save();

        // Add to user's swap history
        await User.findByIdAndUpdate(req.user._id, {
            $push: { swapHistory: swapRequest._id }
        });

        res.status(201).json(swapRequest);
    } catch (error) {
        res.status(500).json({ message: 'Error creating swap request', error: error.message });
    }
};

// Get all swap requests for the logged-in user
exports.getUserSwaps = async (req, res) => {
    try {
        const swaps = await SwapRequest.find({
            $or: [
                { requester: req.user._id },
                { requestedItem: { $in: await Item.find({ uploader: req.user._id }).select('_id') } }
            ]
        })
        .populate('requester', 'name email')
        .populate('requestedItem')
        .populate('offeredItem');

        res.json(swaps);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching swap requests', error: error.message });
    }
};

// Update swap request status
exports.updateSwapStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const swapRequest = await SwapRequest.findById(req.params.id)
            .populate('requestedItem')
            .populate('offeredItem');

        if (!swapRequest) {
            return res.status(404).json({ message: 'Swap request not found' });
        }

        // Verify user is involved in the swap
        const requestedItem = swapRequest.requestedItem;
        const isInvolved = 
            swapRequest.requester.toString() === req.user._id.toString() ||
            requestedItem.uploader.toString() === req.user._id.toString();

        if (!isInvolved) {
            return res.status(403).json({ message: 'Not authorized to update this swap request' });
        }

        // Handle status update
        if (status === 'Completed') {
            // Update item availability
            await Promise.all([
                Item.findByIdAndUpdate(swapRequest.requestedItem, { isAvailable: false }),
                Item.findByIdAndUpdate(swapRequest.offeredItem, { isAvailable: false })
            ]);
        }

        swapRequest.status = status;
        await swapRequest.save();

        res.json(swapRequest);
    } catch (error) {
        res.status(500).json({ message: 'Error updating swap status', error: error.message });
    }
}; 