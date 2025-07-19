
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/menu', categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.post('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
