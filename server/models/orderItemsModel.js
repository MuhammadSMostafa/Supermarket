const mongoose = require('mongoose');

// Define the schema
const orderItemSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: [true, 'There is no order that befalls this item.'],
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'There is no product.'],
  },
  quantity: {
    type: Number,
    required: [true, 'There must be a quantity'],
  },
  price: {
    type: Number,
    required: [true, 'There must be a price'],
  },
});

// Create the model
module.exports = mongoose.model('OrderItem', orderItemSchema);
