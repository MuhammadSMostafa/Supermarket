const jwt = require('jsonwebtoken');

const generateWebToken = (payload, options = { expiresIn: '2d' }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

module.exports = { generateWebToken, verifyToken };
