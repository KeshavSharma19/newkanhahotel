const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/contactController');

router.post('/submit', enquiryController.submitEnquiry);

module.exports = router;