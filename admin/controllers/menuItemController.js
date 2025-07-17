const menuItemService = require('../services/menuItemService');

exports.createItem = async (req, res) => {
  const result = await menuItemService.createItem(req);
  res.status(result.status ? 201 : 400).json(result);
};

exports.getItems = async (req, res) => {
  const result = await menuItemService.getItems();
  res.status(result.status ? 200 : 400).json(result);
};

exports.getItemsByCategory = async (req, res) => {
  const result = await menuItemService.getItemsByCategory(req);
  res.status(result.status ? 200 : 400).json(result);
};

exports.updateItem = async (req, res) => {
  const result = await menuItemService.updateItem(req);
  res.status(result.status ? 200 : 400).json(result);
};

exports.deleteItem = async (req, res) => {
  const result = await menuItemService.deleteItem(req);
  res.status(result.status ? 200 : 400).json(result);
};
