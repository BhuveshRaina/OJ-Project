const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => { 
  const cookieToken = req.cookies?.token;
  const headerToken = req.header('Authorization')?.replace('Bearer ', '');
  const token = cookieToken || headerToken;

  if (!token) return res.status(401).json({ message: 'No token provided', success: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token', success: false });
  }
};

module.exports = authMiddleware;