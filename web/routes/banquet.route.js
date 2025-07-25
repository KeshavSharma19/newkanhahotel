const express = require('express');
const router = express.Router();
const banquetController = require('../controllers/banquet.controller');

router.get('/banquet-list' , banquetController.viewBanquetList); 

module.exports = router;
