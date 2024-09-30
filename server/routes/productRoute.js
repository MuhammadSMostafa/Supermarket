const express = require('express');
const router = express.Router();
const { checkCategory } = require('./../controllers/categoryController');
const {
  checkRequest,
  authorizeUser,
  authenticateUser,
} = require('./../utils/authUtils');
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./../controllers/productController');

router.get('/', getAllProducts);
router.post(
  '/',
  authenticateUser,
  authorizeUser('Admin'),
  checkRequest('product'),
  createProduct
);
router.get('/:id', getProduct);
router.patch(
  '/:id',
  authenticateUser,
  authorizeUser('Admin'),
  checkRequest('product'),
  updateProduct
);
router.delete('/:id', authenticateUser, authorizeUser('Admin'), deleteProduct);

module.exports = router;
