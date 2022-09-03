const Todo = require('../models/Todo');
module.exports = {
    editItem: async (req,res) => {
        try{
            const item = await Todo.find({_id:req.params.id});
            res.render('edit.ejs',{item,title:'Edit Item'});
        }catch(error){
            console.error(error);
            res.redirect('/todos');
        }
    },
    updateItem: async (req,res) => {
        try{
            await Todo.findOneAndUpdate({_id:req.params.id},{
                todo: req.body.groceryItem,
                quantity: req.body.quantity,
            })
            res.redirect('/todos');
        }catch(error){
            console.error(error);
        }
    }
}