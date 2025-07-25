const restaurantService = require('../services/restaurantService');

exports.viewTableList = async (req, res) => {
  try {
    const result = await restaurantService.viewTableList(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
};