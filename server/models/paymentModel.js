const mongoose = require('mongoose');

// Define the schema
const paymentSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    payment_method: {
      type: String,
      enum: ['Credit Card', 'PayPal', 'Bank Transfer'],
      required: true,
    },
    payment_status: {
      type: String,
      enum: ['Paid', 'Pending'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

// Create the model
module.exports = mongoose.model('Payment', paymentSchema);
