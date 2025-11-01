/**
 * Auth middleware
 * - Verifies JWT from `Authorization` header (Bearer token)
 * - Attaches `req.user` and `req.userID` (string) when valid
 * - Returns 401 for missing/invalid/expired tokens
 */
const jwt = require('jsonwebtoken');
const User = require('../model/user-model');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ msg: 'Unauthorized: token not provided' });
    }

    // Accept formats: 'Bearer <token>' or just '<token>'
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : authHeader.trim();
    if (!token) return res.status(401).json({ msg: 'Unauthorized: invalid token format' });

    // Ensure secret exists
    if (!process.env.JWT_SECRET_KEY) {
      console.error('JWT_SECRET_KEY not set in environment');
      return res.status(500).json({ msg: 'Server configuration error' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      if (err.name === 'TokenExpiredError') return res.status(401).json({ msg: 'Unauthorized: token expired' });
      return res.status(401).json({ msg: 'Unauthorized: invalid token' });
    }

    // Find user - token payload may contain email or id
    const query = {};
    if (decoded.email) query.email = decoded.email;
    else if (decoded.userID || decoded.id) query._id = decoded.userID || decoded.id;

    const user = await User.findOne(query).select('-password');
    if (!user) return res.status(401).json({ msg: 'Unauthorized: user not found' });

    req.user = user;
    req.userID = user._id.toString();
    next();
  } catch (err) {
    console.error('Auth middleware unexpected error:', err);
    return res.status(401).json({ msg: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
