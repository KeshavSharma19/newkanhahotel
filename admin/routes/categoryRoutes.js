
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middlewares/auth');

router.post('/add-menu-category', auth, categoryController.createCategory);
router.get('/all-menu-category', auth, categoryController.getCategories);
router.post('/:id/update-menu-category', auth, categoryController.updateCategory);
router.delete('/:id/delete-menu-category', auth, categoryController.deleteCategory);

module.exports = router;
