const categoryService = require('../services/categoryService');

exports.createCategory = async (req, res) => {
  const result = await categoryService.createCategory(req);
  res.status(result.status ? 201 : 400).json(result);
};

exports.getCategories = async (req, res) => {
  const result = await categoryService.getCategories();
  res.status(result.status ? 200 : 400).json(result);
};

exports.updateCategory = async (req, res) => {
  const result = await categoryService.updateCategory(req);
  res.status(result.status ? 200 : 400).json(result);
};

exports.deleteCategory = async (req, res) => {
  const result = await categoryService.deleteCategory(req);
  res.status(result.status ? 200 : 400).json(result);
};
