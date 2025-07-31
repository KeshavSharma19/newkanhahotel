const blogService = require('../services/blogService');

exports.createBlog = async (req, res) => {
  try {
    const result = await blogService.createBlog(req);
    res.status(result.status ? 201 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - createBlog:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const result = await blogService.getAllBlogs(req);
    res.status(result.status ? 201 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - getAllBlogs:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const result = await blogService.updateBlog(req);
    res.status(result.status ? 201 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - updateBlog:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const result = await blogService.deleteBlog(req);
    res.status(result.status ? 201 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - updateBlog:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};