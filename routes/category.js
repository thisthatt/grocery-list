const express = require('express');
const categoryController = require('../controllers/category');
const router = express.Router();

router.get('/',categoryController.createCategory)

router.post('/',categoryController.updateCategory)

router.post('/deleteCategory',categoryController.deleteCategory);

module.exports = router;