const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// JWT auth middleware
exports.isAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: 'Authentication error', error: error.message });
    }
};

// Admin check middleware
exports.isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
    }
    
    next();
}; 