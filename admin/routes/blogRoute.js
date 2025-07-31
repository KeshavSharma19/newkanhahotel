const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../../utils/multer');
const auth = require('../middlewares/auth');

router.post('/add-blog', auth, upload.single('thumbnail'), blogController.createBlog);
router.get('/list-blogs', blogController.getAllBlogs);
router.post('/update-blog/:id', auth, upload.single('thumbnail'), blogController.updateBlog);
router.post('/delete-blog/:id', auth, blogController.deleteBlog);

module.exports = router;
