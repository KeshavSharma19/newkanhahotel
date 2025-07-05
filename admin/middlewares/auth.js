const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET; // use env var in real app

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: false, message: 'Unauthorized Access!' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.adminId = decoded.id; // Attach to req
    next();
  } catch (err) {
    return res.status(401).json({ status: false, message: 'Invalid token' });
  }
};
