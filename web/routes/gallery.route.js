const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/gallery.controller');

router.post('/view-gallery', galleryController.viewgallery);

module.exports = router;