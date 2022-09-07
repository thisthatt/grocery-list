const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    maxLength: [50, "Category name should be less than 50 characters"],
  },
  userId: {
    type: String,
    required: true,
  },
  display: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model('Category', CategorySchema)