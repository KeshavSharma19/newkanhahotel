const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');

router.get('/published-blog-listing' , blogController.allPublishedBlogs);
router.get('/blog-details/:id' , blogController.blogDetails); 

// details-banquet 

module.exports = router;
