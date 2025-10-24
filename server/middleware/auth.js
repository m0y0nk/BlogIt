// File: server/middleware/auth.js (NEW FILE)

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  let token;

  // Check for token in 'Authorization' header
  // Format: "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to the request object (excluding the password)
      // This 'req.user' will be available in all protected routes
      req.user = {
        userId: decoded.userId,
        username: decoded.username
      };
      
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = authMiddleware;