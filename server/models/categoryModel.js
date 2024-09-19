const mongoose = require('mongoose');

// Define the schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You have to provide a name for the category'],
    trim: true,
  },
});

// Create the model
module.exports = mongoose.model('Category', categorySchema);
