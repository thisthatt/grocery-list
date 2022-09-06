const Todo = require('../models/Todo')
const Category = require('../models/Category')
/**
 * getTodos - Render the todo page
 * createTodo - Create an item
 * markComplete - Mark an item as complete
 * markIncomplete - Mark an item as incomplete
 * deleteTodo - Delete an item 
 * deleteCategory - Delete a category
 */

module.exports = {
    getTodos: async (req,res)=>{
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            const category = await Category.find({userId:req.user._id}).sort({_id:-1});
            const defaultOptions = ['PRODUCE','DAIRY','DELI','FROZEN','OTHER'];
            const newCategory = category.filter(item => !defaultOptions.includes(item.category));
            res.render('todos.ejs', {title:'Homepage',todos: todoItems, left: itemsLeft, user: req.user,category,newCategory});
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            const category = await Category.find({category:req.body.category,userId:req.user._id})
            if(!category.length){
                const newCategory = await Category.create({category:req.body.category,userId:req.user._id,display:true});
                await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id, quantity: req.body.quantity,category:newCategory.category})
                console.log('Todo has been added!')
                res.redirect('/todos')
            }else{
                await Category.findOneAndUpdate({category:req.body.category,userId:req.user._id},{
                    display:true
                })
                await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id, quantity: req.body.quantity,category:category[0].category})
                console.log('Todo has been added!')
                res.redirect('/todos')
            }

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
            await Category.findOneAndUpdate({category:req.body.categoryFromJSFile,userId:req.user._id},{
                display:false
            });
            console.log('Deleted Category')
            res.json('Deleted It')
        }catch(error){
            console.error(error);
        }
    }
}    