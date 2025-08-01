const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');

router.get('/list', enquiryController.getAllEnquiries);              
router.post('/status/:id', enquiryController.updateEnquiryStatus);     

module.exports = router;
