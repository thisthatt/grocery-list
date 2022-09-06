const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
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
  },
  category: {
    type:String,
  }
})

TodoSchema.set('timestamps', true)

module.exports = mongoose.model('Todo', TodoSchema)
