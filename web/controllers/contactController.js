const contactService = require('../services/contactService');

exports.bookRoom = async (req, res) => {
  try {
    const result = await contactService.bookRoom(req);
    res.status(result.status ? 200 : 400).json(result);
  } catch (error) {
    console.error('bookRoom error:', error);
    res.status(500).json({ status: false, message: 'Server error while booking room' });
  }
};