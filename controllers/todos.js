const Todo = require('../models/Todo')
const Category = require('../models/Category')

module.exports = {
    getTodos: async (req,res)=>{
        // console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            const category = await Category.find();
            if(!category.length){
                const defaultOption = ['Produce','Dairy','Frozen','Deli'];
                defaultOption.forEach(async (item) => {
                    await Category.create({category:item,display:false});
                });
                res.redirect('/todos');
            }
            res.render('todos.ejs', {title:'Homepage',todos: todoItems, left: itemsLeft, user: req.user,category});
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            const category = await Category.findOneAndUpdate({category:req.body.category},{
                display:true
            });
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id, quantity: req.body.quantity,categoryId:category._id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    createCategory: async (req, res)=>{
        try{
            await Category.create({category: req.body.categoryName, userId: req.user.id})
            console.log('category has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    deleteCategory: async (req,res) => {
        try{
            await Category.findOneAndDelete({category:req.body.categoryFromJSFile});
            console.log('Deleted Category')
            res.json('Deleted It')
        }catch(error){
            console.error(error);
        }
    }
}    