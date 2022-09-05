//Import Category model
const Category = require('../models/Category');
/**
 * getCategory - Render category page to Add/Delete item
 * createCategory - Create category
 * deleteCategory - Delete category
 */
module.exports = {
    getCategory: async (req,res) => {
        const defaultOption = ['PRODUCE','DAIRY','FROZEN','DELI','OTHER'];
        const category = await Category.find({userId:req.user._id}).sort({_id:-1});
        const filteredCategory = [];
        category.forEach(item => {
            if(!defaultOption.includes(item.category)){
                filteredCategory.push(item.category);
            }
        });
        const newCategory = [...filteredCategory,...defaultOption];
        res.render('category',{title:'Add Category',newCategory,filteredCategory});
    },
    createCategory:async (req,res) => {
        const exist = await Category.find({category:req.body.categoryName.toUpperCase(),userId:req.user._id});
        if(!exist.length){
            await Category.create({category:req.body.categoryName.toUpperCase(),userId:req.user._id});
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