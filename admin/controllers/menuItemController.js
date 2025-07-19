const menuItemService = require('../services/menuItemService');

exports.createItem = async (req, res) => {
  try {
    const result = await menuItemService.createItem(req);
    res.status(result.status ? 201 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - createItem:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

exports.getItems = async (req, res) => {
  try {
    const result = await menuItemService.getItems();
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - getItems:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

exports.getItemsByCategory = async (req, res) => {
  try {
    const result = await menuItemService.getItemsByCategory(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - getItemsByCategory:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const result = await menuItemService.updateItem(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - updateItem:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const result = await menuItemService.deleteItem(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - deleteItem:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};
