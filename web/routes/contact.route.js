const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');

router.post('/submit', enquiryController.submitEnquiry);

module.exports = router;