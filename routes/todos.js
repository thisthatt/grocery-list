const express = require('express')
const router = express.Router()
const editRoute = require('./edit');
const categoryRoute = require('./category');
const todosController = require('../controllers/todos') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos)

router.post('/createTodo', todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)

router.put('/deleteHeader', todosController.deleteCategory)

router.use('/edit',editRoute);

router.use('/category',categoryRoute);


module.exports = router