const Item = require('../models/Item');

// Create new item
exports.createItem = async (req, res) => {
    try {
        const item = new Item({
            ...req.body,
            uploader: req.user._id // From auth middleware
        });
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all approved items with filters
exports.getItems = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            category,
            size,
            tags,
            sortBy = 'createdAt',
            order = 'desc',
            featured
        } = req.query;

        // Build query
        const query = { approved: true };
        
        // Add filters if provided
        if (search) {
            query.$text = { $search: search };
        }
        if (category) {
            query.category = category;
        }
        if (size) {
            query.size = size;
        }
        if (tags) {
            query.tags = { $in: Array.isArray(tags) ? tags : [tags] };
        }
        if (featured === 'true') {
            query.featured = true;
        }

        // Execute query with pagination
        const items = await Item.find(query)
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .populate('uploader', 'username'); // Only get username from uploader

        // Get total count for pagination
        const total = await Item.countDocuments(query);

        res.json({
            items,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single item by ID
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
            .populate('uploader', 'username');
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update item (owner or admin)
exports.updateItem = async (req, res) => {
    try {
        // Validate user authentication
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User authentication required' });
        }

        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Check if user is owner or admin
        const isOwner = item.uploader && req.user._id && item.uploader.toString() === req.user._id.toString();
        if (!req.user.isAdmin && !isOwner) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // If admin is updating, don't reset approval status
        const updateData = {
            ...req.body,
            approved: req.user.isAdmin ? req.body.approved : false // Only reset approval if non-admin
        };

        // Update and return new item
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        res.json(updatedItem);
    } catch (error) {
        console.error('Error in updateItem:', error);
        res.status(400).json({ message: error.message });
    }
};

// Delete item (owner or admin)
exports.deleteItem = async (req, res) => {
    try {
        // Validate user authentication
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User authentication required' });
        }

        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Check if user is owner or admin
        const isOwner = item.uploader && req.user._id && item.uploader.toString() === req.user._id.toString();
        if (!req.user.isAdmin && !isOwner) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error in deleteItem:', error);
        res.status(500).json({ message: error.message });
    }
};

// Admin: Get pending items
exports.getPendingItems = async (req, res) => {
    try {
        const items = await Item.find({ approved: false })
            .populate('uploader', 'username')
            .sort({ createdAt: 'desc' });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Approve/reject item
exports.approveItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            {
                approved: req.body.approved,
                featured: req.body.featured || false
            },
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Admin: Toggle featured status
exports.toggleFeatured = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        
        item.featured = !item.featured;
        await item.save();
        
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 