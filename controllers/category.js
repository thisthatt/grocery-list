const Category = require('../models/Category');
module.exports = {
    createCategory: async (req,res) => {
        const category = await Category.find().sort({_id:-1});
        res.render('category',{title:'Add Category',category});
    },
    updateCategory:async (req,res) => {
        const exist = await Category.find({category:req.body.categoryName.toUpperCase()});
        if(!exist.length){
            await Category.create({category:req.body.categoryName.toUpperCase(),display:false});
            res.redirect('/todos/category');
        }else{
            res.redirect('/todos/category');
        }
    },
    deleteCategory: async(req,res) => {
        const defaultOption = ['PRODUCE','DAIRY','FROZEN','DELI','OTHER'];
        if(defaultOption.includes(req.body.category)){
            res.redirect('/todos/category');
        }else{
            await Category.findOneAndDelete({category:req.body.category});
            res.redirect('/todos/category')
        }
    }
}