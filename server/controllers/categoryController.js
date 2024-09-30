const Category = require('./../models/categoryModel');

const checkCategory = async (req, res, next) => {
  const category = await Category.findOne({ name: req.body.categoryName });
  if (category) {
    delete req.body.categoryName;
    req.body.category_id = category._id;
  } else {
    const newCategory = await Category.create({ name: req.body.categoryName });
    delete req.body.categoryName;
    req.body.category_id = newCategory._id;
  }
  next();
};

module.exports = { checkCategory };
