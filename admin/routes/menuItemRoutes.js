const express = require('express');
const router = express.Router();
const itemController = require('../controllers/menuItemController');

router.post('/create-item/:categoryId',  itemController.createItem);
router.get('/menu-items', itemController.getItems);
router.get('/menu-item-by-categories/:categoryId', itemController.getItemsByCategory);
router.post('/update-item/:id',  itemController.updateItem);
router.delete('/delete-item/:id',  itemController.deleteItem);

module.exports = router;
