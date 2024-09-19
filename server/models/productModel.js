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
});

// Create the model
module.exports = mongoose.model('Product', productSchema);
