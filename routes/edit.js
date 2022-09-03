const express = require('express');
const editController = require('../controllers/edit');
const router = express.Router();

router.get('/:id',editController.editItem)

router.post('/:id',editController.updateItem)

module.exports = router;