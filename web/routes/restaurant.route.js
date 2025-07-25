const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/table-list' , restaurantController.viewTableList); 

module.exports = router;
