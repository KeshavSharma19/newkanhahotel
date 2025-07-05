const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const upload = require('../../utils/multer');
const auth = require('../middlewares/auth');

router.post('/signup', adminController.adminSignup);
router.post('/signin', adminController.adminSignin);
router.post('/forget-password', adminController.adminForgetPassword);
router.put('/change-image', auth, upload.single('image'), adminController.adminChangeImage);
router.put('/sign-out', auth, adminController.adminLogout);

module.exports = router;
