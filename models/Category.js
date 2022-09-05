const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  userId:{
    type:String,
    required:true
  },
  display:{
    type:Boolean,
    default:false,
    required:true
  }
})

module.exports = mongoose.model('Category', CategorySchema)