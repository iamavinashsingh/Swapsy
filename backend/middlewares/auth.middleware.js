const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const protect = async (req, res, next) => {
    let token;

  // Check for Bearer token in headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
        token = req.headers.authorization.split(' ')[1]; // Get token after "Bearer"

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to request object (without password)
        req.user = await User.findById(decoded.id).select('-password');

        next(); // pass control to next middleware/route
        } catch (err) {
        res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = protect;
