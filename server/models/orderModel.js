const mongoose = require('mongoose');

// Define the schema
const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Can't be an order without a user."],
  },
  order_status: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  total_price: {
    type: Number,
    required: [true, 'There must be a price.'],
  },
});

// Create the model
module.exports = mongoose.model('Order', orderSchema);
