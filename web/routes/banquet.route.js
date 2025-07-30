const express = require('express');
const router = express.Router();
const banquetController = require('../controllers/banquet.controller');

router.get('/banquet-list' , banquetController.viewBanquetList);
router.get('/banquet-list-details/:id' , banquetController.getBanquetById); 

// details-banquet 

module.exports = router;
