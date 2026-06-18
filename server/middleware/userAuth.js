const jwt = require('jsonwebtoken');

const userAuthMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided. Please login.' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'user') {
      return res.status(403).json({ message: 'Access denied. User token required.' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token. Please login again.' });
  }
};

module.exports = userAuthMiddleware;
