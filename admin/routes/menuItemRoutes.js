const express = require('express');
const router = express.Router();
const itemController = require('../controllers/menuItemController');

router.get('/menu-item', itemController.getItems);
router.get('/menu-item-by-categories/:id', itemController.getItemsByCategory);
router.post('/create-item',  itemController.createItem);
router.put('/update-item/:id',  itemController.updateItem);
router.delete('/delete-item/:id',  itemController.deleteItem);

module.exports = router;
