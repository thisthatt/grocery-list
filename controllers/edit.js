//Import Models
const Todo = require('../models/Todo');
const Category = require('../models/Category');

/**
 * editItem - Render edit page to edit list item
 * updateItem - Update the list 
*/
module.exports = {
    editItem: async (req,res) => {
        try{
            const item = await Todo.find({_id:req.params.id});
            const category = await Category.find({userId:req.user._id});
            const defaultOptions = ['PRODUCE','DAIRY','DELI','FROZEN','OTHER'];
            const filteredCategory = []
            category.forEach(item => {
                if(!defaultOptions.includes(item.category)){
                    filteredCategory.push(item.category);
                }
            });
            const newCategory = [...defaultOptions,...filteredCategory];
            res.render('edit.ejs',{item,title:'Edit Item',category,newCategory});
        }catch(error){
            console.error(error);
            res.redirect('/todos');
        }
    },
    updateItem: async (req,res) => {
        try{
            const category = await Category.find({category:req.body.category,userId:req.user._id});
            if(!category.length){
                await Category.create({category:req.body.category,userId:req.user._id});
                await Todo.findOneAndUpdate({_id:req.params.id},{
                    todo: req.body.groceryItem,
                    quantity: req.body.quantity,
                    category: req.body.category
                });
                res.redirect('/todos');
            }else{
                await Todo.findOneAndUpdate({_id:req.params.id},{
                    todo: req.body.groceryItem,
                    quantity: req.body.quantity,
                    category: req.body.category
                });
                res.redirect('/todos');
            }
        }catch(error){
            console.error(error);
        }
    }
}