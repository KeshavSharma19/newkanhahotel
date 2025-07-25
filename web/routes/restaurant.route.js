const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/menu-list', restaurantController.getFullMenuForUser);
router.get('/table-list' , restaurantController.viewTableList); 

module.exports = router;
