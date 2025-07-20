const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const auth = require('../middlewares/auth');
const upload = require('../../utils/multer');

// GALLERY CRUD
router.post('/add-image', auth, upload.single('image'), galleryController.addGalleryImage);
router.get('/list-images', auth, galleryController.getGalleryImages);
router.post('/update-image/:imageId', auth, upload.single('image'), galleryController.updateGalleryImage);
router.post('/delete-image/:imageId', auth, galleryController.deleteGalleryImage);

module.exports = router;
