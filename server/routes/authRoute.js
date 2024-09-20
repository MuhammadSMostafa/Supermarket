const express = require('express');
const router = express.Router();
const { sanitizeRequest } = require('./../utils/authUtils');
const {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
} = require('./../controllers/authController');
const { authenticateUser } = require('./../utils/authUtils');

router.post('/register', sanitizeRequest('register'), registerUser);
router.post('/login', sanitizeRequest('login'), loginUser);
router.get('/logout', authenticateUser, logoutUser);
router.post(
  '/change-password',
  sanitizeRequest('changePassword'),
  authenticateUser,
  changePassword
);

module.exports = router;
