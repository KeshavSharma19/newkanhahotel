const tableService = require('../services/tableService');

exports.createTable = async (req, res) => {
  try {
    const result = await tableService.createTable(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - createTable:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

exports.getAllTables = async (req, res) => {
  try {
    const result = await tableService.getAllTables();
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - getAllTables:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

exports.getTableById = async (req, res) => {
  try {
    const result = await tableService.getTableById(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - getTableById:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

exports.updateTable = async (req, res) => {
  try {
    const result = await tableService.updateTable(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - updateTable:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

exports.deleteTable = async (req, res) => {
  try {
    const result = await tableService.deleteTable(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Controller Error - deleteTable:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};
