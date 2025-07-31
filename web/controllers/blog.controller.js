const blogService = require('../services/blog.service');

exports.allPublishedBlogs = async (req, res) => {
  try {
    const result = await blogService.allPublishedBlogs(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};

exports.blogDetails = async (req, res) => {
  try {
    const result = await blogService.blogDetails(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};