const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  display:{
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('Category', CategorySchema)