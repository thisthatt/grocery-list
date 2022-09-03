const Todo = require('../models/Todo');
const Category = require('../models/Category');
module.exports = {
    editItem: async (req,res) => {
        try{
            const item = await Todo.find({_id:req.params.id});
            const category = await Category.find();
            res.render('edit.ejs',{item,title:'Edit Item',category});
        }catch(error){
            console.error(error);
            res.redirect('/todos');
        }
    },
    updateItem: async (req,res) => {
        try{
            const category = await Category.find({category:req.body.category});
            await Todo.findOneAndUpdate({_id:req.params.id},{
                todo: req.body.groceryItem,
                quantity: req.body.quantity,
                categoryId: category[0]._id
            })
            res.redirect('/todos');
        }catch(error){
            console.error(error);
        }
    }
}