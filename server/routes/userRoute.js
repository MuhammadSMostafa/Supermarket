const express = require('express');
const router = express.Router();
const { getUser, updateUser } = require('./../controllers/userController');
const { authenticateUser, checkRequest } = require('./../utils/authUtils');

router.get('/:id', authenticateUser, getUser);
router.patch('/:id', authenticateUser, checkRequest('user'), updateUser);

module.exports = router;
