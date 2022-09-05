const express = require('express');
const categoryController = require('../controllers/category');
const router = express.Router();

router.get('/',categoryController.getCategory)

router.post('/',categoryController.createCategory)

router.post('/deleteCategory',categoryController.deleteCategory);

module.exports = router;