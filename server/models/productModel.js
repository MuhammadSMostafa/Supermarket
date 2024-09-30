const Category = require('./categoryModel');
const mongoose = require('mongoose');

// Define the schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'There must be a name for the product'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'There must be a price for the product'],
  },
  stock: {
    type: Number,
    required: [true, 'There must be a stock for the product'],
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'The product must fall under a category'],
  },
  categoryName: {
    type: String,
    select: false,
  },
});

productSchema.pre('validate', async function (next) {
  const product = this;
  const category = await Category.findOne({
    name: product.categoryName.toLowerCase(),
  });
  console.log(
    `i'm at the middleware and product = ${product.categoryName.toLowerCase()} and the category is ${category}`
  );
  if (category) {
    delete product._doc.categoryName;
    product.category_id = category._id;
  } else {
    const newCategory = await Category.create({
      name: product.categoryName.toLowerCase(),
    });
    delete product._doc.categoryName;
    product.category_id = newCategory._id;
  }
  console.log('Product after saving:', product);
  next();
});

productSchema.post(
  ['find', 'findOne', 'findById'],
  async function (docs, next) {
    if (docs) {
      if (Array.isArray(docs)) {
        for (let doc of docs) {
          const category = await Category.findOne({ _id: doc?.category_id });
          doc.categoryName = category.name;
          delete doc._doc.category_id;
        }
      } else {
        const category = await Category.findOne({ _id: docs?.category_id });
        delete docs?._doc.category_id;
        docs.categoryName = category?.name;
      }
    }
    next();
  }
);

// Create the model
module.exports = mongoose.model('Product', productSchema);
