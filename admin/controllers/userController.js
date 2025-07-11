const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
}

exports.getUserBookings = async (req, res) => {
  try {
    const result = await userService.getUserBookings(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ status: false, message: 'Internal server error.' });
  }
}