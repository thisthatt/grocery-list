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
            const category = await Category.find().sort({_id:-1});
            if(!category.length){
                const defaultOption = ['PRODUCE','DAIRY','DELI','FROZEN','OTHER'].reverse();
                defaultOption.forEach(async (item) => {
                    await Category.create({category:item,display:false});
                });
                res.redirect('/todos');
            }else{
                res.render('todos.ejs', {title:'Homepage',todos: todoItems, left: itemsLeft, user: req.user,category});
            }
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
            const defaultOption = ['PRODUCE','DAIRY','FROZEN','DELI','OTHER'];
            if(defaultOption.includes(req.body.categoryFromJSFile.toUpperCase())){
                await Category.findOneAndUpdate({category:req.body.categoryFromJSFile.toUpperCase()},{
                    display:false
                });
                console.log('Deleted Category')
                res.json('Deleted It')
            }else{
                await Category.findOneAndDelete({category:req.body.categoryFromJSFile.toUpperCase()});
                console.log('Deleted Category')
                res.json('Deleted It')
            }
        }catch(error){
            console.error(error);
        }
    }
}    