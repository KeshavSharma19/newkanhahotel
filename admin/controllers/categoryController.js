const categoryService = require('../services/categoryService');

exports.createCategory = async (req, res) => {
  try {
    const result = await categoryService.createCategory(req);
    res.status(result.status ? 201 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - createCategory:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const result = await categoryService.getCategories();
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - getCategories:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const result = await categoryService.updateCategory(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - updateCategory:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const result = await categoryService.deleteCategory(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - deleteCategory:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};
