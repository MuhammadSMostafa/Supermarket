const express = require('express');
const router = express.Router();
const {
  checkRequest,
  authenticateUser,
  authorizeUser,
} = require('./../utils/authUtils');
const {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
} = require('./../controllers/authController');

router.post('/register', checkRequest('register'), registerUser);
router.post('/login', checkRequest('login'), loginUser);
router.get('/logout', authenticateUser, logoutUser);
router.post(
  '/change-password',
  checkRequest('changePassword'),
  authenticateUser,
  changePassword
);

module.exports = router;
