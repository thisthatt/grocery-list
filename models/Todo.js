const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
    maxLength: [200, 'Item name should be less than 200 characters']

  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    max:[1000, 'Quantity must be less than 1000']
  },
  category: {
    type:String,
  }
})
TodoSchema.set("timestamps", true);
module.exports = mongoose.model('Todo', TodoSchema)
