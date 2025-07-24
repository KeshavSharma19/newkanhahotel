
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middlewares/auth');

router.post('/add-menu-category', auth, categoryController.createCategory);
router.get('/all-menu-category', auth, categoryController.getCategories);
router.post('/update-menu-category/:id', auth, categoryController.updateCategory);
router.post('/delete-menu-category/:id', auth, categoryController.deleteCategory);

module.exports = router;
