const Product = require('./../models/productModel');

const getAllProducts = async (req, res, next) => {
  const products = await Product.find();
  console.log(products);
  res.status(200).json({ success: true, products });
};
const getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({ success: true, product });
};
const createProduct = async (req, res, next) => {
  const createdProduct = await Product.create(req.body);
  res.status(200).json({ success: true, createdProduct });
};
const updateProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  Object.keys(req.body).forEach((element) => {
    product[element] = req.body[element];
  });
  product.save();
  res.status(200).json({ success: true, message: 'Updated successfully' });
};
const deleteProduct = async (req, res, next) => {
  console.log(req.params);
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).json({});
};

module.exports = {
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProduct,
};
