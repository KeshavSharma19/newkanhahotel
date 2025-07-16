const express = require('express');
const router = express.Router();
const itemController = require('../controllers/menuItemController');

router.get('/', itemController.getItems);
router.get('/category/:id', itemController.getItemsByCategory);
router.post('/',  itemController.createItem);
router.put('/:id',  itemController.updateItem);
router.delete('/:id',  itemController.deleteItem);

module.exports = router;
